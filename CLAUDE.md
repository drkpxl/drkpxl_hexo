# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **DrkPxl Labs**, a tech blog built with **Hexo 7.3.0** focusing on 3D printing, home automation, self-hosting, and personal projects. The codebase includes a custom Express.js editor server for browser-based content management.

## Essential Commands

### Development
- `npm run dev` - Start custom editor server (port 3000) + Hexo server (port 4001)
- `npm run editor` - Start only the custom editor server
- `npm run server` - Start standard Hexo development server
- `hexo server --draft --port 4000` - Run Hexo with drafts on specific port

### Build & Deploy
- `npm run build` - Generate static site (`hexo generate`)
- `npm run clean` - Clean generated files (`hexo clean`)
- `npm run deploy` - Deploy site (`hexo deploy`)

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Architecture

### Custom Development Environment
The project uses a **dual-server setup**:
- **Editor Server** (port 3000): Express.js app with browser-based markdown editor
- **Hexo Server** (port 4001): Standard Hexo preview server

Key files:
- `editor-server.js` - Custom content management system
- `frontmatter.json` - Defines blog post schema and validation

### Content Structure
- `source/_posts/` - Published blog posts (18 posts across 9 categories)
- `source/_drafts/` - Draft posts
- `source/pages/` - Static pages (about, blue-sky, this-week)
- `source/images/` - Blog images and assets
- `source/printer-profiles/` - 3D printer configuration files

### Theme & Customization
- Uses **Cactus theme** with "paperdark" color scheme
- Theme files in `themes/cactus/`
- Custom configurations in `themes/cactus/_config.yml`

## Configuration Files

### Primary Configs
- `_config.yml` - Main Hexo site configuration
- `themes/cactus/_config.yml` - Theme-specific settings
- `netlify.toml` - Deployment configuration for Netlify
- `package.json` - Dependencies and npm scripts

### Content Schema
The `frontmatter.json` defines required fields for blog posts:
- title, description, date, tags, categories
- Used by custom editor for validation

## Dependencies

### Core Framework
- **hexo**: 7.3.0 - Static site generator
- **express**: 4.18.2 - Custom editor backend
- **gray-matter**: 4.0.3 - Frontmatter parsing
- **multer**: 2.0.1 - Image upload handling

### Hexo Ecosystem
- Multiple hexo-generator-* plugins for archives, categories, tags
- hexo-renderer-* for EJS, Markdown-it, Stylus
- hexo-tag-youtube-responsive for video embeds

## Development Workflow

### Content Creation
1. Use `npm run dev` to start both editor and preview servers
2. Access editor at `http://localhost:3000`
3. Preview changes at `http://localhost:4001`
4. Images uploaded to `source/images/` (5MB limit)

### Site Generation
- Run `npm run build` to generate static files in `public/`
- Clean with `npm run clean` if needed
- Deploy automatically triggers on Netlify via Git push

## Important Notes

- **Node.js 22+** required (specified in netlify.toml)
- **Timezone**: Configured for MST
- **Permalink structure**: Clean URLs (`:title/`)
- **Image handling**: Automatic upload and markdown insertion via editor
- **Mobile responsive**: Theme optimized for mobile-first experience