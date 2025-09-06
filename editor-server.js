const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const matter = require('gray-matter');
const fetch = require('node-fetch');

const app = express();

// Configuration constants
const CONFIG = {
    PORT: 3000,
    HOST: '0.0.0.0',
    HEXO_PORT: 4001,
    POSTS_DIR: 'source/_posts',
    IMAGES_DIR: 'source/images/',
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: /\.(jpg|jpeg|png|gif|webp)$/i,
    TEMP_DIR: 'temp_posts'
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
    
    // Auto-update lastmod timestamp for existing posts (unless manually overridden)
    const updatedFrontmatter = { ...frontmatter };
    if (!updatedFrontmatter.lastmod || updatedFrontmatter.lastmod === '') {
      updatedFrontmatter.lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    }
    
    // Combine frontmatter and content
    const fullContent = matter.stringify(content, updatedFrontmatter);
    
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
    
    const now = new Date();
    const frontmatter = {
      title: title,
      date: now.toISOString(),
      lastmod: now.toISOString().split('T')[0], // YYYY-MM-DD format
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

// Initialize Hexo for markdown rendering and server
let hexoInstance = null;
let hexoServerInstance = null;

async function initHexo() {
  if (!hexoInstance) {
    const Hexo = require('hexo');
    hexoInstance = new Hexo(process.cwd(), {});
    await hexoInstance.init();
  }
  return hexoInstance;
}

async function startHexoServer() {
  try {
    console.log('Starting embedded Hexo server...');
    const hexo = await initHexo();
    
    // Check if port is already in use
    const isPortInUse = await checkPort(CONFIG.HEXO_PORT);
    if (isPortInUse) {
      console.log(`Port ${CONFIG.HEXO_PORT} already in use, skipping Hexo server startup`);
      return null;
    }

    // Start Hexo server
    hexoServerInstance = await hexo.call('server', {
      port: CONFIG.HEXO_PORT,
      open: false,
      draft: true
    });
    
    console.log(`Hexo server started on http://localhost:${CONFIG.HEXO_PORT}`);
    return hexoServerInstance;
  } catch (error) {
    console.error('Failed to start Hexo server:', error.message);
    return null;
  }
}

// Utility function to check if port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(false);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true);
    });
  });
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

// Preview with full blog styling
app.post('/api/preview-styled', async (req, res) => {
  try {
    const { frontmatter, content } = req.body;
    
    if (!content.trim()) {
      return res.json({ html: '<p class="text-gray-500 italic">Start typing to see preview...</p>' });
    }

    // Check if Hexo server is running
    const isHexoRunning = await checkPort(CONFIG.HEXO_PORT);
    if (!isHexoRunning) {
      return res.status(503).json({ 
        error: 'Hexo server not available. Falling back to basic preview.',
        fallback: true 
      });
    }

    try {
      // Create temporary post file with a cleaner filename
      const timestamp = Date.now();
      const slugTitle = (frontmatter?.title || 'Preview Post')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      const tempFilename = `${slugTitle}-preview-${timestamp}.md`;
      const tempFilePath = path.join(CONFIG.POSTS_DIR, tempFilename);
      
      // Create frontmatter with defaults (must be draft: false to be accessible)
      const baseFrontmatter = {
        title: frontmatter?.title || 'Preview Post',
        date: frontmatter?.date || new Date().toISOString(),
        tags: frontmatter?.tags || [],
        categories: frontmatter?.categories || [],
        draft: false // Important: must be false to be accessible via URL
      };
      
      // Merge with user frontmatter but ALWAYS override draft to false
      const tempFrontmatter = {
        ...baseFrontmatter,
        ...frontmatter,
        draft: false // Force false regardless of user setting for preview
      };
      
      console.log('DEBUG: tempFrontmatter:', tempFrontmatter);
      
      // Write temporary post file
      const fullContent = matter.stringify(content, tempFrontmatter);
      await fs.writeFile(tempFilePath, fullContent, 'utf8');
      
      // Wait longer for Hexo to process the new file
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate URL based on the slug (since permalink is :title/)
      const postUrl = `http://localhost:${CONFIG.HEXO_PORT}/${slugTitle}/`;
      
      const response = await fetch(postUrl, { timeout: 5000 });
      
      if (response.ok) {
        const styledHtml = await response.text();
        
        // Extract the main content area (this will depend on your theme structure)
        // For now, return the full page but we could extract just the article content
        res.json({ 
          html: styledHtml,
          isStyled: true,
          url: postUrl
        });
      } else {
        throw new Error('Failed to fetch styled preview');
      }
      
      // Clean up temporary file more aggressively
      setTimeout(async () => {
        try {
          await fs.unlink(tempFilePath);
          console.log(`Cleaned up temp file: ${tempFilename}`);
        } catch (cleanupError) {
          console.error('Failed to cleanup temp file:', cleanupError.message);
        }
      }, 2000);
      
    } catch (styledError) {
      console.error('Styled preview error:', styledError.message);
      
      // Fallback to basic preview
      const hexo = await initHexo();
      const rendered = await hexo.render.render({ text: content, engine: 'md' });
      
      res.json({ 
        html: `<div class="prose max-w-none">${rendered}</div>`,
        isStyled: false,
        fallback: true
      });
    }
  } catch (error) {
    console.error('Preview error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Preview post in new tab - simplified endpoint that just creates temp post and returns URL
app.post('/api/preview-url', async (req, res) => {
  try {
    const { frontmatter, content } = req.body;
    
    if (!content.trim()) {
      return res.status(400).json({ 
        success: false,
        message: 'No content to preview. Start writing in the editor!' 
      });
    }

    // Check if Hexo server is running
    const isHexoRunning = await checkPort(CONFIG.HEXO_PORT);
    if (!isHexoRunning) {
      return res.status(503).json({ 
        success: false,
        message: 'Hexo server not available. Please ensure the server is running.'
      });
    }

    try {
      // Create temporary post file with a cleaner filename
      const timestamp = Date.now();
      const slugTitle = (frontmatter?.title || 'Preview Post')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      const tempFilename = `${slugTitle}-preview-${timestamp}.md`;
      const tempFilePath = path.join(CONFIG.POSTS_DIR, tempFilename);
      
      // Create frontmatter with defaults (must be draft: false to be accessible)
      const baseFrontmatter = {
        title: frontmatter?.title || 'Preview Post',
        date: frontmatter?.date || new Date().toISOString(),
        tags: frontmatter?.tags || [],
        categories: frontmatter?.categories || [],
        draft: false // Important: must be false to be accessible via URL
      };
      
      // Merge with user frontmatter but ALWAYS override draft to false
      const tempFrontmatter = {
        ...baseFrontmatter,
        ...frontmatter,
        draft: false // Force false regardless of user setting for preview
      };
      
      // Write temporary post file
      const fullContent = matter.stringify(content, tempFrontmatter);
      await fs.writeFile(tempFilePath, fullContent, 'utf8');
      
      // Wait longer for Hexo to process the new file
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate URL based on the filename (Hexo uses filename for permalink :title/)
      // Remove the .md extension from filename to get the URL slug
      const urlSlug = tempFilename.replace('.md', '');
      const postUrl = `http://localhost:${CONFIG.HEXO_PORT}/${urlSlug}/`;
      
      // Clean up temporary file after delay
      setTimeout(async () => {
        try {
          await fs.unlink(tempFilePath);
          console.log(`Cleaned up temp file: ${tempFilename}`);
        } catch (cleanupError) {
          console.error('Failed to cleanup temp file:', cleanupError.message);
        }
      }, 30000); // 30 seconds delay to give time for user to view preview
      
      res.json({ 
        success: true,
        url: postUrl
      });
      
    } catch (error) {
      console.error('Preview URL generation error:', error.message);
      res.status(500).json({ 
        success: false,
        message: 'Failed to create preview URL. Please try again.'
      });
    }
  } catch (error) {
    console.error('Preview URL error:', error.message);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Publish post to git
app.post('/api/publish', async (req, res) => {
  try {
    const { filename, commitMessage } = req.body;
    
    if (!filename || !commitMessage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Filename and commit message are required' 
      });
    }
    
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Construct the file path
    const filePath = `source/_posts/${filename}`;
    
    try {
      // Check if file exists
      await fs.access(path.join(CONFIG.POSTS_DIR, filename));
      
      // Git operations
      console.log(`Publishing ${filePath}...`);
      
      // Add the specific file
      await execAsync(`git add "${filePath}"`);
      console.log(`Added ${filePath} to git staging`);
      
      // Commit with the provided message
      const commitCmd = `git commit -m "${commitMessage.replace(/"/g, '\\"')}"`;
      await execAsync(commitCmd);
      console.log(`Committed with message: ${commitMessage}`);
      
      // Push to remote
      await execAsync('git push');
      console.log('Pushed to remote repository');
      
      res.json({ 
        success: true, 
        message: 'Post published successfully!' 
      });
      
    } catch (gitError) {
      console.error('Git operation error:', gitError);
      
      // Handle case where there's nothing to commit
      if (gitError.message.includes('nothing to commit')) {
        return res.json({ 
          success: false, 
          message: 'No changes to commit. File may already be up to date.' 
        });
      }
      
      throw gitError;
    }
    
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to publish: ${error.message}` 
    });
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

// Start the combined server
async function startServer() {
  try {
    // Start Hexo server first
    await startHexoServer();
    
    // Start the editor server
    app.listen(CONFIG.PORT, CONFIG.HOST, () => {
      console.log(`\n✅ Combined Server Started Successfully!`);
      console.log(`📝 Editor: http://localhost:${CONFIG.PORT}`);
      console.log(`📝 Editor (Tailscale): http://100.101.39.4:${CONFIG.PORT}`);
      console.log(`🌐 Blog: http://localhost:${CONFIG.HEXO_PORT}`);
      console.log(`🌐 Blog (Tailscale): http://100.101.39.4:${CONFIG.HEXO_PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🔄 Shutting down servers...');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🔄 Shutting down servers...');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();