# Hexo Web Editor

A self-hosted web-based markdown editor for your Hexo blog with drag-and-drop image support and live preview.

## Features

- 📝 **EasyMDE Editor** - Clean, distraction-free markdown editing
- 📱 **Mobile Responsive** - Edit from any device via Tailscale
- 🖼️ **Drag & Drop Images** - Simply drag images into the editor or use the upload button  
- 👀 **Live Preview** - Real-time preview using Hexo's markdown renderer
- 💾 **Auto-save** - Never lose your work with automatic saving
- 🔍 **Post Browser** - Easy navigation between existing posts
- 🎨 **Clean UI** - Tailwind CSS-powered interface

## Usage

### Starting the Editor

```bash
npm run editor
```

The editor will be available at:
- Local: http://localhost:3000
- Tailscale: http://100.101.39.4:3000

### Creating Posts

1. Click "New Post" in the sidebar
2. Enter a title when prompted
3. Start writing in the markdown editor
4. Drag and drop images directly into the editor
5. Use Cmd+S (Mac) or Ctrl+S (Windows/Linux) to save

### Image Uploads

Images are automatically uploaded to `source/images/` and referenced with the correct path in your markdown. Supported formats:
- JPG/JPEG
- PNG
- GIF
- WebP

Maximum file size: 5MB

### Publishing

Posts are saved directly to your `source/_posts/` directory. When you're ready to publish:

1. Set `draft: false` in the post frontmatter, or
2. Use your existing Hexo workflow (`hexo generate` and deploy)

Your existing Netlify auto-deploy will pick up changes when you push to GitHub.

## File Structure

```
├── editor-server.js          # Express.js server
├── editor-public/            # Web interface
│   ├── index.html            # Main editor interface
│   └── app.js                # Client-side JavaScript
└── source/
    ├── _posts/               # Your blog posts
    └── images/               # Uploaded images
```

## API Endpoints

- `GET /api/posts` - List all posts
- `GET /api/posts/:filename` - Get specific post
- `POST /api/posts/:filename` - Save post
- `POST /api/posts` - Create new post
- `POST /api/upload` - Upload image
- `POST /api/preview` - Generate preview

## Development

The editor integrates seamlessly with your existing Hexo setup:
- Uses your current `_config.yml` settings
- Leverages Hexo's markdown renderer for previews
- Maintains your existing file structure and naming conventions
- Works with your current deployment pipeline

## Mobile Editing

Access the editor on mobile devices via your Tailscale network at `http://100.101.39.4:3000`. The interface is fully responsive and optimized for touch editing.

## Keyboard Shortcuts

- `Cmd/Ctrl + S` - Save post
- `Cmd/Ctrl + B` - Bold text
- `Cmd/Ctrl + I` - Italic text
- `F11` - Fullscreen editing

---

Happy blogging! 🎉