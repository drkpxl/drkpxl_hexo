# DrkPxl Labs - Tech Blog

A personal tech blog covering 3D printing, home automation, self-hosting, coding projects, and wellness. Built with Hexo and the Cactus theme, deployed on Netlify.

## Blog Focus Areas

- **3D Printing**: Bambu Labs guides, filament profiles, maintenance tips
- **Home Automation**: ESP32 projects, Home Assistant integrations, IoT devices  
- **Self-Hosting**: Docker deployments, server setup guides, privacy tools
- **Development**: Open source projects, themes, web scraping, automation
- **Hardware Projects**: Custom electronics, sensors, smart home devices
- **Wellness**: Fitness tracking, cycling, personal health journeys

## Prerequisites

- Node.js 22+ (specified in netlify.toml)
- npm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# or
hexo server --draft

# Create new post
hexo new post "My Post Title"

# Create new draft
hexo new draft "Draft Title"

# Generate static files
npm run build
# or
hexo generate

# Clean generated files
npm run clean
```

## Front Matter Reference

### Required Fields
```yaml
---
title: "Your Post Title"           # Required - Post title
date: 2024-MM-DD                  # Required - Publication date
---
```

### Optional Fields
```yaml
---
title: "Your Post Title"
date: 2024-MM-DD HH:mm:ss
description: "Brief post description for SEO and excerpts"
tags:                             # Array of tags for categorization
  - 3d-printing
  - home-automation
  - code
categories:                       # Array of categories for organization  
  - projects
  - tutorials
slug: "custom-url-slug"          # Custom URL (defaults to title)
draft: false                     # Set to true for draft posts
lastmod: 2024-MM-DD              # Last modification date
preview: "/images/preview.webp"   # Preview image path or true/false
---
```

### Front Matter Examples from Existing Posts

**Comprehensive post:**
```yaml
---
title: "Engineering a Clapper to Toggle My Living Room Lights On and Off"
date: 2024-10-05
lastmod: 2024-10-07
description: "How I built a modern clapper using an ESP32 to toggle my living room lights, integrating clap detection with Home Assistant for a smart home upgrade."
slug: "creating-a-clapper-to-toggle-my-living-room-lights-on-and-off"
draft: false
tags: []
categories:
  - code
---
```

**Simple post:**
```yaml
---
title: "Bambu Labs Filament Profiles"
date: "2024-09-25"
description: "Improved filament profiles for Bambu Labs 3D printers"
tags: []
---
```

## Markdown Support

This blog uses `hexo-renderer-markdown-it` with enhanced features:

### Standard Markdown
- Headers (# ## ###)
- **Bold** and *italic* text  
- [Links](https://example.com)
- `inline code` and code blocks
- > Blockquotes
- Lists (ordered and unordered)

### Enhanced Features
- **Tables**: GitHub Flavored Markdown tables
- **HTML**: Inline HTML tags supported
- **Line breaks**: Automatic `<br>` conversion  
- **Smart typography**: Smart quotes and punctuation
- **Auto-linking**: URLs automatically become links

### Code Highlighting
```javascript
// Syntax highlighting with line numbers
function hello() {
    console.log("Hello, world!");
}
```

### Image Sizing
```markdown
![Alt text](/images/photo.jpg =400x300)  # Resize to 400x300
![Alt text](/images/photo.jpg =50%x)     # 50% width, auto height
```

### YouTube Embedding
```markdown
{% youtube dQw4w9WgXcQ %}
```

### Excerpts
Use `<!--more-->` to set excerpt break point:
```markdown
This appears in the excerpt.

<!--more-->

This appears only in the full post.
```

## Theme Configuration

**Theme**: Cactus with `paperdark` colorscheme  
**Config**: `themes/cactus/_config.yml`  
**Colors**: `themes/cactus/source/css/_colors/paperdark.styl`  

### Key Theme Features
- Responsive design (mobile-first)
- Dark theme optimized
- Social media links (GitHub, X/Twitter, Bluesky)
- Font Awesome icons
- Project showcase integration

## Directory Structure

```
source/
├── _posts/          # Published posts
├── _drafts/         # Draft posts (shown with --draft flag)
├── about/           # About page
├── images/          # Image assets
└── _data/           # Data files

themes/cactus/       # Theme files
public/              # Generated site (after hexo generate)
```

## Development Workflow

1. **Writing**: Create drafts in `source/_drafts/`
2. **Preview**: Use `hexo server --draft` to preview with drafts
3. **Publish**: Move from `_drafts/` to `_posts/` when ready
4. **Deploy**: Push to main branch for automatic Netlify deployment

## Useful Commands

```bash
# Development server with drafts
hexo server --draft

# Publish a draft (manual move)
mv source/_drafts/post-name.md source/_posts/

# Clean and rebuild
hexo clean && hexo generate

# Run linting
npm run lint

# Format code
npm run format
```

## Deployment

- **Platform**: Netlify
- **Branch**: main
- **Build Command**: `npm run build`
- **Node Version**: 22.11 (configured in netlify.toml)
- **Auto-deploy**: Enabled on push to main

## Content Tips

1. **Images**: Store in `source/images/` and reference as `/images/filename.ext`
2. **Drafts**: Use draft mode for work-in-progress posts
3. **SEO**: Always include `description` field for better SEO
4. **Categories**: Use consistent category names across posts
5. **Tags**: Tag posts for better discoverability
6. **Code**: Use appropriate language tags for syntax highlighting
7. **Mobile**: All content is mobile-responsive by default

## Common Issues

- **Build fails**: Run `hexo clean` then `hexo generate`
- **Missing images**: Check paths start with `/images/`
- **Draft not showing**: Use `--draft` flag with hexo server
- **Theme issues**: Check `themes/cactus/_config.yml` configuration

---

*For questions or issues, reach out on [Bluesky](https://bsky.app/profile/drkpxl.com) or [GitHub](https://github.com/drkpxl)*