# DrkPxl Labs Blog - Quick Reference Guide

This is a Hexo-based blog using the Cactus theme with a custom paper-dark color scheme.

## Prerequisites

- Node.js (v22.11 as specified in netlify.toml)
- npm

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start local server with live reload
hexo server

# Create new draft post
hexo new draft "My Post Title"

# Create new page
hexo new page "page-name"

# Generate static files
hexo generate

# Clean generated files
hexo clean
```

## Common Tasks

### 1. Local Development

```bash
# Start local server with drafts enabled
hexo server --draft

# Watch for changes
hexo server --watch
```

The site will be available at `http://localhost:4000`

### 2. Creating Content

```bash
# Create a draft post (goes to source/_drafts)
hexo new draft "My New Post"

# Create a page (goes to source/page-name/index.md)
hexo new page "page-name"

# Publish a draft
mv source/_drafts/post-name.md source/_posts/
```

#### Post Front Matter Template
```yaml
---
title: Your Title
date: YYYY-MM-DD HH:mm:ss
tags: 
  - tag1
  - tag2
categories: 
  - category
description: Brief description of your post
preview: /path/to/preview/image (optional)
---
```

### 3. Updating Projects

Edit `source/_data/projects.json` to update the projects list. Format:

```json
[
    {
       "name": "Project Name",
       "url": "project-url",
       "desc": "Project description"
    }
]
```

### 4. Deployment

```bash
# Clean and generate
hexo clean && hexo generate

# Deploy to Netlify
git add .
git commit -m "Your commit message"
git push
```

Netlify will automatically deploy when changes are pushed to the main branch.

## Theme Customization

- Main theme config: `themes/cactus/_config.yml`
- Color scheme: `themes/cactus/source/css/_colors/paperdark.styl`
- Site config: `_config.yml`

## Content Locations

```
source/
├── _posts/      # Published posts
├── _drafts/     # Draft posts
├── about/       # About page
├── images/      # Image assets
└── _data/       # Data files (projects.json)
```

## Useful Tips

1. Use `<!--more-->` in posts to set excerpt break points
2. Images should be placed in `source/images/`
3. Draft posts won't show up in production but will show locally with `--draft` flag
4. YouTube videos can be embedded using: `{% youtube video-id %}`
5. The theme supports Font Awesome icons
6. Tags and categories are case-sensitive

## Troubleshooting

If things aren't working:

1. Delete `db.json`
2. Run `hexo clean`
3. Delete `node_modules` and run `npm install`
4. Start fresh with `hexo server`

Remember to check Node.js version if there are unexpected errors.