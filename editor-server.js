const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const matter = require('gray-matter');

const app = express();

// Configuration constants
const CONFIG = {
    PORT: 3000,
    HOST: '0.0.0.0',
    POSTS_DIR: 'source/_posts',
    IMAGES_DIR: 'source/images/',
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: /\.(jpg|jpeg|png|gif|webp)$/i
};

// Utility functions
const sanitizeFilename = (filename) => {
    return filename
        .toLowerCase()
        .replace(/[^\w\s.-]/g, '')
        .replace(/\s+/g, '-');
};

const sendResponse = (res, success, data = null, message = null, statusCode = 200) => {
    res.status(statusCode).json({ success, data, message });
};

const sendError = (res, message, statusCode = 500) => {
    console.error('API Error:', message);
    sendResponse(res, false, null, message, statusCode);
};

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, CONFIG.IMAGES_DIR);
    },
    filename: (req, file, cb) => {
        const cleanName = sanitizeFilename(file.originalname);
        cb(null, cleanName);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(CONFIG.ALLOWED_IMAGE_TYPES)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: CONFIG.MAX_FILE_SIZE
    }
});

// Middleware
app.use(express.json());
app.use(express.static('editor-public'));
app.use('/images', express.static('source/images'));

// API Routes

// Get list of posts
app.get('/api/posts', async (req, res) => {
    try {
        const files = await fs.readdir(CONFIG.POSTS_DIR);
        const posts = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(CONFIG.POSTS_DIR, file);
                const stats = await fs.stat(filePath);
                const content = await fs.readFile(filePath, 'utf8');
                const parsed = matter(content);
                
                posts.push({
                    filename: file,
                    title: parsed.data.title || file.replace('.md', ''),
                    date: parsed.data.date || stats.mtime,
                    draft: parsed.data.draft || false
                });
            }
        }

        // Sort by date, newest first
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        sendResponse(res, true, posts);
    } catch (error) {
        sendError(res, `Failed to load posts: ${error.message}`);
    }
});

// Get specific post
app.get('/api/posts/:filename', async (req, res) => {
    try {
        const filePath = path.join(CONFIG.POSTS_DIR, req.params.filename);
        const content = await fs.readFile(filePath, 'utf8');
        const parsed = matter(content);
        
        sendResponse(res, true, {
            frontmatter: parsed.data,
            content: parsed.content
        });
    } catch (error) {
        sendError(res, 'Post not found', 404);
    }
});

// Save post
app.post('/api/posts/:filename', async (req, res) => {
  try {
    const { frontmatter, content } = req.body;
    const filePath = path.join('source/_posts', req.params.filename);
    
    // Combine frontmatter and content
    const fullContent = matter.stringify(content, frontmatter);
    
    await fs.writeFile(filePath, fullContent, 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const filename = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50) + '.md';
    
    const filePath = path.join('source/_posts', filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
      return res.status(400).json({ error: 'Post with this title already exists' });
    } catch (e) {
      // File doesn't exist, proceed
    }
    
    const frontmatter = {
      title: title,
      date: new Date().toISOString(),
      tags: [],
      categories: [],
      draft: true
    };
    
    const fullContent = matter.stringify(content || '', frontmatter);
    await fs.writeFile(filePath, fullContent, 'utf8');
    
    res.json({ filename, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
app.delete('/api/posts/:filename', async (req, res) => {
    try {
        const filePath = path.join(CONFIG.POSTS_DIR, req.params.filename);
        await fs.unlink(filePath);
        sendResponse(res, true, null, 'Post deleted successfully');
    } catch (error) {
        const statusCode = error.code === 'ENOENT' ? 404 : 500;
        sendError(res, error.code === 'ENOENT' ? 'Post not found' : error.message, statusCode);
    }
});

// Get available tags and categories
app.get('/api/tags-categories', async (req, res) => {
  try {
    const tagsCategories = require('./blog-tags-categories-analysis.json');
    res.json(tagsCategories);
  } catch (error) {
    // Fallback if file doesn't exist
    res.json({
      tags: [],
      categories: []
    });
  }
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const imageUrl = `/images/${req.file.filename}`;
  res.json({ 
    success: true, 
    url: imageUrl,
    filename: req.file.filename
  });
});

// Initialize Hexo for markdown rendering
let hexoInstance = null;

async function initHexo() {
  if (!hexoInstance) {
    const Hexo = require('hexo');
    hexoInstance = new Hexo(process.cwd(), {});
    await hexoInstance.init();
  }
  return hexoInstance;
}

// Preview markdown using Hexo renderer
app.post('/api/preview', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content.trim()) {
      return res.json({ html: '<p class="text-gray-500 italic">Start typing to see preview...</p>' });
    }

    try {
      const hexo = await initHexo();
      const rendered = await hexo.render.render({ text: content, engine: 'md' });
      
      res.json({ 
        html: `<div class="prose max-w-none">${rendered}</div>`
      });
    } catch (renderError) {
      // Fallback to simple conversion if Hexo rendering fails
      const simpleHtml = content
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img alt="$1" src="$2" />')
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n/gim, '<br>');
      
      res.json({ 
        html: `<div class="prose max-w-none">${simpleHtml}</div>`
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the main editor page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'editor-public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(CONFIG.PORT, CONFIG.HOST, () => {
    console.log(`Hexo Web Editor running on http://localhost:${CONFIG.PORT}`);
    console.log(`Also accessible via Tailscale at http://100.101.39.4:${CONFIG.PORT}`);
});