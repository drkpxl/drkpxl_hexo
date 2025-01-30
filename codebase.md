# _config.yml

```yml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: DrkPxl Labs
subtitle: ''
description: 'A place for me to share my code, 3D printed designs and various projects and products I work on. '
keywords: ['3d-printing', 'node-js','design', 'code', 'cycling', 'colorado','blog',
'colorado']
author: Steven DrkPxl
language: en
timezone: 'MST'
watch: false

# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://drkpxllabs.netlify.app
root: /
permalink: :title/
permalink_defaults:
pretty_urls:
  trailing_index: false
  trailing_html: false

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:
  - "admin/*"

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: true # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
syntax_highlighter: highlight.js
highlight:
  line_number: true
  auto_detect: true
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  preprocess: true
  line_number: true
  tab_replace: ''

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: MMM, YYYY
time_format: HH:mm:ss
## updated_option supports 'mtime', 'date', 'empty'
updated_option: 'mtime'

# Pagination
## Set per_page to 0 to disable pagination
per_page: 15
pagination_dir: page

# Page Generator
generator:
  pages:
    permalink: :title/ # This will override the permalink for pages

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: cactus
theme_config:
  colorscheme: paper
all_minifier: true


markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
  plugins:
    - markdown-it-imsize
  anchors:
    level: 2
    collisionSuffix: ''
    permalink: false
    permalinkClass: header-anchor
    permalinkSymbol: ¶
  marked:
    gfm: true
    pedantic: false
    sanitize: false
    tables: true
    breaks: false
    smartLists: true
    smartypants: true
    html: true
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: ''


```

# .gitignore

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
_multiconfig.yml
node_modules
.env
```

# .npmrc

```
legacy-peer-deps=true
auto-install-peers=true
strict-peer-dependencies=false
resolution-mode=highest
```

# content/posts/hello-world.md

```md
---
title: Hello, World!
---

## Hello World!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non lorem diam. Quisque vulputate nibh sodales eros pretium tincidunt. Aenean porttitor efficitur convallis. Nulla sagittis finibus convallis. Phasellus in fermentum quam, eu egestas tortor. Maecenas ac mollis leo. Integer maximus eu nisl vel sagittis.

Suspendisse facilisis, mi ac scelerisque interdum, ligula ex imperdiet felis, a posuere eros justo nec sem. Nullam laoreet accumsan metus, sit amet tincidunt orci egestas nec. Pellentesque ut aliquet ante, at tristique nunc. Donec non massa nibh. Ut posuere lacus non aliquam laoreet. Fusce pharetra ligula a felis porttitor, at mollis ipsum maximus. Donec quam tortor, vehicula a magna sit amet, tincidunt dictum enim. In hac habitasse platea dictumst. Mauris sit amet ornare ligula, blandit consequat risus. Duis malesuada pellentesque lectus, non feugiat turpis eleifend a. Nullam tempus ante et diam pretium, ac faucibus ligula interdum.

```

# frontmatter.json

```json
{
  "$schema": "https://frontmatter.codes/frontmatter.schema.json",
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "default",
      "pageBundle": false,
      "previewPath": null,
      "fields": [
        {
          "title": "Title",
          "name": "title",
          "type": "string"
        },
        {
          "title": "Description",
          "name": "description",
          "type": "string"
        },
        {
          "title": "Publishing date",
          "name": "date",
          "type": "datetime",
          "default": "{{now}}",
          "isPublishDate": true
        },
        {
          "title": "Content preview",
          "name": "preview",
          "type": "image"
        },
        {
          "title": "Is in draft",
          "name": "draft",
          "type": "draft"
        },
        {
          "title": "Tags",
          "name": "tags",
          "type": "tags"
        },
        {
          "title": "Categories",
          "name": "categories",
          "type": "categories"
        }
      ]
    }
  ],
  "frontMatter.framework.id": "hexo",
  "frontMatter.preview.host": "http://localhost:4000",
  "frontMatter.content.publicFolder": "source/images",
  "frontMatter.content.pageFolders": [
    {
      "title": "posts",
      "path": "[[workspace]]/source/_posts"
    },
    {
      "path": "[[workspace]]/themes/cactus",
      "title": "cactus"
    }
  ]
}
```

# netlify.toml

```toml
[build]
base = "/"
publish = "public"
command = "npm install && hexo generate"

[build.environment]
NODE_VERSION = "22.11"

[build.processing]
skip_processing = false

[build.processing.images]
compress = true
```

# package.json

```json
{
  "name": "drkpxl-labs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server",
    "dev": "hexo server --draft",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "hexo": {
    "version": "7.3.0"
  },
  "dependencies": {
    "decap-cms-app": "^3.4.0",
    "hexo": "^7.3.0",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-index": "^4.0.0",
    "hexo-generator-tag": "^2.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-markdown-it": "^7.1.1",
    "hexo-renderer-stylus": "^3.0.1",
    "hexo-server": "^3.0.0",
    "hexo-tag-youtube-responsive": "^0.4.2",
    "markdown-it-imsize": "^2.0.1"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "eslint": "^8.54.0",
    "eslint-config-prettier": "^9.0.0",
    "hexo-generator-sitemap": "^3.0.1",
    "prettier": "^3.1.0",
    "typescript": "^5.3.2"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "resolutions": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

# README.md

```md
# DrkPxl Labs Blog - Quick Reference Guide

This is a Hexo-based blog using the Cactus theme with a custom paper-dark color scheme.

## Prerequisites

- Node.js (v22.11 as specified in netlify.toml)
- npm

## Quick Start Commands

\`\`\`bash
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
\`\`\`

## Common Tasks

### 1. Local Development

\`\`\`bash
# Start local server with drafts enabled
hexo server --draft

# Watch for changes
hexo server --watch
\`\`\`

The site will be available at `http://localhost:4000`

### 2. Creating Content

\`\`\`bash
# Create a draft post (goes to source/_drafts)
hexo new draft "My New Post"

# Create a page (goes to source/page-name/index.md)
hexo new page "page-name"

# Publish a draft
mv source/_drafts/post-name.md source/_posts/
\`\`\`

#### Post Front Matter Template
\`\`\`yaml
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
\`\`\`

### 3. Updating Projects

Edit `source/_data/projects.json` to update the projects list. Format:

\`\`\`json
[
    {
       "name": "Project Name",
       "url": "project-url",
       "desc": "Project description"
    }
]
\`\`\`

### 4. Deployment

\`\`\`bash
# Clean and generate
hexo clean && hexo generate

# Deploy to Netlify
git add .
git commit -m "Your commit message"
git push
\`\`\`

Netlify will automatically deploy when changes are pushed to the main branch.

## Theme Customization

- Main theme config: `themes/cactus/_config.yml`
- Color scheme: `themes/cactus/source/css/_colors/paperdark.styl`
- Site config: `_config.yml`

## Content Locations

\`\`\`
source/
├── _posts/      # Published posts
├── _drafts/     # Draft posts
├── about/       # About page
├── images/      # Image assets
└── _data/       # Data files (projects.json)
\`\`\`

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
```

# scaffolds/draft.md

```md
---
title: {{ title }}
tags:
categories:
description:
preview:
---

```

# scaffolds/page.md

```md
---
title: {{ title }}
description: A brief description of the page
permalink: URL this should be
---

```

# scaffolds/post.md

```md
---
title: {{ title }}
date: {{ date }}
tags:
  - tag1
  - tag2
categories:
  - category1
  - category2
description: A brief summary of the post
preview: /images/
draft: true
---

# Title
## Sub-Title

```

# source/_data/projects.json

```json
[
   {
      "name": "PrintWatch",
      "url": "https://github.com/drkpxl/printwatch-card",
      "desc": "A Home Assistant custom card to display the status of your  Bambu Labs printer."
   }
    {
       "name":"Ikon Pass Opening Days",
       "url":"https://opening.drkpxl.com",
       "desc":" Scraping Ikon Pass websites for their opening days using Claude's AI to verify the date."
    },
    {
       "name":"Why Did You Vote",
       "url":"https://www.whydidyouvotefortrump.com",
       "desc":" Capturing the voice of the American voter, using Google's Perspective to help keep the discussion in line"
    },
    {
       "name":"Tiny Air",
       "url":"https://air.drkpxl.com",
       "desc":" An incredibly lightweight way to view air quality in your area. No ads, just air quality."
    },
    {
       "name":"Random Name Selector",
       "url":"https://random.drkpxl.com",
       "desc":" An easy way to select a random name from a list, once a name is selected it can't be selected again that session. A great way to run raffles or contest. Free and not account sign up."
    }
]
```

# source/admin/config/config.yml

```yml
backend:
  name: github
  repo: drkpxl/your-repo-name # Replace with your GitHub username/repo
  branch: main

media_folder: "source/images" # Where media files will be stored
public_folder: "/images" # Where media files will be accessed in your posts

collections:
  - name: "posts"
    label: "Posts"
    folder: "source/_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Categories", name: "categories", widget: "list"}
      - {label: "Preview Image", name: "preview", widget: "image", required: false}
      - {label: "Draft", name: "draft", widget: "boolean", default: true}
      - {label: "Body", name: "body", widget: "markdown"}
```

# source/admin/index.html

```html
<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DrkPxl Labs Content Manager</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>

<body>
    <script>
        window.CMS_MANUAL_INIT = true;
    </script>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
    <script>
        const init = () => {
            CMS.init({
                config: {
                    load_config_file: false,
                    backend: {
                        name: 'git-gateway',
                        branch: 'main'
                    },
                    media_folder: "source/images",
                    public_folder: "/images",
                    slug: {
                        encoding: "ascii",
                        clean_accents: true,
                        sanitize_replacement: "-"
                    },
                    collections: [
                        {
                            name: "posts",
                            label: "Blog Posts",
                            folder: "source/_posts",
                            create: true,
                            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                { label: "Date", name: "date", widget: "datetime" },
                                { label: "Description", name: "description", widget: "string" },
                                { label: "Tags", name: "tags", widget: "list" },
                                { label: "Categories", name: "categories", widget: "list" },
                                {
                                    label: "Preview Image",
                                    name: "preview",
                                    widget: "image",
                                    required: false,
                                    pattern: ['^[a-z0-9-]+\.(jpg|jpeg|png|gif|webp)$', "Filename must contain only lowercase letters, numbers, and hyphens"]
                                },
                                { label: "Draft", name: "draft", widget: "boolean", default: true },
                                { label: "Body", name: "body", widget: "markdown" }
                            ]
                        },
                        {
                            name: "pages",
                            label: "Pages",
                            label_singular: "Page",
                            folder: "source/pages",
                            create: true,
                            nested: {
                                depth: 2,
                                summary: "{{title}}"
                            },
                            path: "{{slug}}/index",
                            meta: { path: { widget: "string", label: "Path", index_file: "index" } },
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                { label: "Date", name: "date", widget: "datetime" },
                                { label: "Description", name: "description", widget: "string", required: false },
                                { label: "Body", name: "body", widget: "markdown" },
                                { label: "Permalink", name: "permalink", widget: "string" }
                            ]
                        },
                        {
                            name: "drafts",
                            label: "Draft Posts",
                            folder: "source/_drafts",
                            create: true,
                            fields: [
                                { label: "Title", name: "title", widget: "string" },
                                { label: "Tags", name: "tags", widget: "list" },
                                { label: "Categories", name: "categories", widget: "list" },
                                { label: "Description", name: "description", widget: "string" },
                                { label: "Preview Image", name: "preview", widget: "image", required: false },
                                { label: "Body", name: "body", widget: "markdown" }
                            ]
                        },
                        {
                            name: "projects",
                            label: "Projects",
                            files: [
                                {
                                    name: "project-list",
                                    label: "Project List",
                                    file: "source/_data/projects.json",
                                    fields: [
                                        {
                                            label: "Projects",
                                            name: "projects",
                                            widget: "list",
                                            fields: [
                                                { label: "Name", name: "name", widget: "string" },
                                                { label: "URL", name: "url", widget: "string" },
                                                { label: "Description", name: "desc", widget: "text" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            });
        };
        init();
    </script>
</body>

</html>
```

# source/pages/about/index.md

```md
---
title: about
date: 2024-11-22 17:18:55
permalink: about/
---

# Hello, I'm Steven

I'm a thinker, maker and overall curious dad. When I am not working my full time job I am busy being a dad, a cyclist, and a closet 3d printer and maker. DrkPxl.com is a place to document that work.
```

# source/pages/blue-sky/index.md

```md
---
title: Blue Sky
date: 2024-12-03T13:19:00.000Z
description: Blue Sky Feed
permalink: blue-sky/
---
  
  <script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>

{% raw %}
<bsky-embed
    username="drkpxl.com"
    limit="5"
    load-more="true">
</bsky-embed>
{% endraw %}

```

# source/pages/this-week/index.md

```md
---
title: "This Week"
permalink: this-week/
date: "2024-09-27"
lastmod: "2024-10-15"
tags: ['life']
description: "Whats going on in my life this week. I try to keep it updated"
---

# What's Happening in My Life this Week

### Week of October 14, 2024

* Create a Jeep 4xe tips and tricks blog?
* Finally print a crystal dragon for my daughter
* TV Sink - Make smart TVs dumb
* Blow out the sprinkler lines
* How to create a LLC, what is it vs S-Corp, etc
* Research the best way to code with AI and have long context windows

## Week of October 7th, 2024

* Learning about Docker. I have tried in the past but keep giving up but finally get it as I use an old Raspberry Pi as a file server / code playground
* Bought a Raspberry Pi 5 with the AI kit addon and camera. I have some ideas but won't tackle it for a while
* Spent a good amount of time cleaning up my Home Assistant, and could spend a good amount of time continuing that but perhaps won't.
* Hit my goal way of <165lbs!

### Week of September 30th, 2024

* Using AI to help me code in Express, Node and Tailwinds. So far both ChatGPT and Claude have been really helpful. Coding up a Mtn Bike trailhead weather site
* Realizing I don't like TrainerDay's plans and likely will go back to Zwift


### Week of September 23rd, 2024

* [Ollama](tab:https://ollama.com/) and Local AI. Facebook put out a new 3B 3.2 model, I got it up and running on the MacMini with Ollam and WebUI. It's no where near as good as the 8B model or ChatGPT or Claude but its cool and important to have it running. Also have been learning a bunch about how these models work and how different training data effects things.
* [Lex Fridman and Cenk Uyger](tab:https://podcasts.apple.com/us/podcast/lex-fridman-podcast/id1434243584?i=1000667556389) did a podcast together. It's long but amazingly refreshing to see how 2 different sides can find similarity in positions and I educated myself about corporatism and now see it existing in my day to day.
* [LED Filament](tab:https://www.aliexpress.us/item/3256805891525953.html?spm=a2g0o.productlist.main.3.2138G44eG44e1L&algo_pvid=bae0c000-db28-4d97-a47c-0d532b685aa7&algo_exp_id=bae0c000-db28-4d97-a47c-0d532b685aa7-1&pdp_npi=4%40dis%21EUR%213.70%213.43%21%21%2128.44%2126.41%21%402103956b17270683372665954e30a8%2112000039376227593%21sea%21ES%211908945554%21X&curPageLogUid=rmy6vkojoezV&utparam-url=scene%3Asearch%7Cquery_from%3A&aff_fcid=109c195c42474624bc781196061e610e-1727450617399-06827-_Dmds62d&tt=CPS_NORMAL&aff_fsk=_Dmds62d&aff_platform=portals-tool&sk=_Dmds62d&aff_trace_key=109c195c42474624bc781196061e610e-1727450617399-06827-_Dmds62d&terminal_id=8c49a2899a6f4c9692c2783f739e0fb5&afSmartRedirect=y&gatewayAdapt=glo2usa4itemAdapt) is some really cool filament to do neo light time stuff with 3d prints. [YouTube](tab:https://www.youtube.com/watch?v=MpdHxHsWguU&pp=ygUMbGVkIGZpbGFtZW50)
* [Perplexia](tab:https://github.com/nilsherzig/LLocalSearch), a local clone to Perplexity. Haven't installed it yet since I want to get Docker setup and running on an old PC and just haven't gotten around to it yet.

```

# source/printer-profiles/DrkPxl_Experimental_3.2_Final.curaprofile.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/DrkPxl3.5PETG_Klipper.curaprofile.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/DrkPxlV2.curaprofile.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/DrkPxlV3.2VaseMode.curaprofile.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/Ender3S1-Orca-Slicer-V1-Profile.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/Filament-presets.zip

This is a binary file of the type: Compressed Archive

# source/printer-profiles/UniveralPETG_DrkPxl.zip

This is a binary file of the type: Compressed Archive

# themes/.gitkeep

```

```

# themes/cactus/_config.yml

```yml
##############################################################################
# Content
##############################################################################

# Link to a page that gives an overview of all your projects.
# This can be an external link (e.g., to you GitHub profile) or to another
# page within your website.
projects_url: http://github.com/drkpxl

# Set the page direction to RTL or LTR. default is LTR. (if you set it 'rtl', the 'vazir' font will be loaded.)
direction: ltr
# Configure the navigation menu.
# A pair 'Key: url' will result in a link to 'url' with the name 'Key' in the
# navigation menu. Optionally, you can add translations for the 'Key' in
# languages/*.yml
nav:
  home: /
  about: /about/
  articles: /archives/
  bluesky: /blue-sky/
  projects: http://github.com/drkpxl


# Links to your social media accounts.
# The 'icon' keys should correspond to Fontawesome icon names
# (see https://fontawesome.com/icons?d=gallery&s=brands);
# only 'mail' is an exception.
# You can optionally add a 'label' key to set the title attribute on the link. 
# 'icon' value will be used as title when 'label' is missing.
social_links:
  -
    icon: github
    link: http://github.com/drkpxl
  -
    icon: x-twitter
    link: https://x.com/stevendrkpxl
  -
    icon: bluesky
    link: https://bsky.app/profile/drkpxl.com

# Customize the overview with displaying a tagcloud on the index page.
# Options: https://hexo.io/docs/helpers.html#tagcloud
tags_overview: false

# Customize the overview with the most recent blog posts on the index page.
# Options:
#   - show_all_posts: whether to show all available posts.
#   - post_count: whether to show only the x most recent posts.
#   - sort_updated: sort posts by last modification date instead of creation date.
posts_overview:
  show_all_posts: false
  post_count: 5
  sort_updated: false

# Customize the archive view.
# Options:
#   - sort_updated: sort posts by last modification date instead of creation date.
# Note: this does not work together with pagination, since the pagination
# plugin will sort pages by date of creation.
archive:
  sort_updated: false

# Customize the article view.
# Options:
#   - show_updated: show the last modification date.
post:
  show_updated: false

# Customize the copyright years
# Note: if start_year/end_year not provided, will use current year.
copyright:
  start_year: 2016
  end_year:

# Customize the 404 page
# Options:
#   - enabled: whether to enable the 404 page (404.html).
error_404:
  enabled: true
  title: "404 Page Not Found"
  description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."


##############################################################################
# Look and Feel
##############################################################################

# Customize the logo (i.e., the cactus) in the header.
# Options:
#   - enabled: whether to show (true) or hide (false) the logo.
#   - width: width of the logo in pixel units
#   - height: height of the logo in pixel units
#   - url: where the logo can be found
#   - gravatar: whether to use your Gravatar as the logo
#   - grayout: whether to enable a hover effect on the logo
logo:
  enabled: true
  width: 60
  height: 60
  url: /images/avatar.webp
  gravatar: false
  grayout: false

# Customize the favicons.
# Cactus supports a limited set of the three most important icons:
#   - desktop: The classic favion.ico file.
#   - android: A 192x192 PNG file.
#   - apple:  A 180x180 PNG file.
# These can be generated with http://realfavicongenerator.net/
# Options:
#   - url: where the icon can be found
#   - gravatar: whether to create a favicon from your Gravatar
favicon:
  desktop:
    url: /images/favicon.ico
    gravatar: false
  android:
    url: /images/web-app-manifest-192x192.png
    gravatar: false
  apple:
    url: /images/apple-touch-icon.png
    gravatar: false

# The color scheme that should be used to highlight codeblocks.
# See source/css/_highlight for a list of all available color schemes.
# highlight: rainbow

# Set the color scheme.
# Available color schemes are 'dark', 'light', 'classic' and 'white'.
# Alternatively, add your own custom color scheme to source/css/_colors.
colorscheme: paper

# Maximal width of the page in rem units.
page_width: 50



##############################################################################
# Miscellaneous
##############################################################################

# Enable or disable the RSS feed.
rss: true

# Turn your web pages into graph objects (see http://ogp.me).
open_graph:
  fb_app_id:
  fb_admins:
  twitter_id:
  google_plus:


##############################################################################
# Plugins
##############################################################################

# Enable MathJax support for Latex
mathjax:
  enabled: false

# Fill in your Disqus Comments Shortname to enable Disqus comments.
disqus:
  enabled: false
  shortname: cactus-1

# Fill in your Utterances data to enable Utterances comments
utterances:
  enabled: false
  repo: owner/githubrepo
  issue_term: pathname
  label: Comment
  theme: github-dark

# Fill in your Google Analytics tracking ID to enable Google Analytics.
google_analytics:
  enabled: false
  id: UA-

# Fill in your Baidu Analytics tracking ID to enable Baidu Analytics.
baidu_analytics:
  enabled: false
  id: 

# Fill in your Cloudflare Analytics tracking ID to enable Cloudflare Analytics.
cloudflare_analytics:
  enabled: false
  id: 

# Fill in your Umami Analytics tracking ID to enable Umami Analytics.
umami_analytics:
  enabled: false
  id: 
  host: https://analytics.domain.com
  script_name: umami.js

# Fill in you Gravatar email or hash if you want to use your gravatar as the
# logo and/or favicons of you website.
# To generate hash: `$ echo -n "name@email.com" | md5`.
gravatar:
  email: steven@drkpxl.com
  hash: 

# loads libraries and styles from CDN instead or relying on local files
cdn:
  enable: true
  jquery: https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
  clipboard: https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.7/clipboard.min.js
  #font_awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css


```

# themes/cactus/.gitignore

```
.DS_Store
.idea/
*.log
*.iml
.tern-port
yarn.lock
package-lock.json
node_modules/
.vscode
```

# themes/cactus/.jshintrc

```
{
  "asi": false,
  "bitwise": true,
  "browser": true,
  "camelcase": true,
  "curly": true,
  "forin": true,
  "immed": true,
  "latedef": "nofunc",
  "maxlen": 120,
  "newcap": true,
  "noarg": true,
  "noempty": true,
  "nonew": true,
  "predef": [
    "$"
  ],
  "quotmark": true,
  "trailing": true,
  "undef": true,
  "unused": true,

  "expr": true
}

```

# themes/cactus/.stylintrc

```
{
    "blocks": false,
    "brackets": "never",
    "colons": "always",
    "colors": "always",
    "commaSpace": "always",
    "commentSpace": "always",
    "cssLiteral": "never",
    "customProperties": [],
    "depthLimit": false,
    "duplicates": true,
    "efficient": "always",
    "exclude": ["source/css/_highlight/*"],
    "extendPref": false,
    "globalDupe": false,
    "groupOutputByFile": true,
    "indentPref": 2,
    "leadingZero": "never",
    "maxErrors": false,
    "maxWarnings": false,
    "mixed": false,
    "mixins": [],
    "namingConvention": "lowercase-dash",
    "namingConventionStrict": true,
    "none": "always",
    "noImportant": true,
    "parenSpace": "never",
    "placeholders": "always",
    "prefixVarsWithDollar": "always",
    "quotePref": "double",
    "reporterOptions": {
        "columns": ["lineData", "severity", "description", "rule"],
        "columnSplitter": "  ",
        "showHeaders": false,
        "truncate": true
    },
    "semicolons": "never",
    "sortOrder": "grouped",
    "stackedProperties": "never",
    "trailingWhitespace": "never",
    "universal": false,
    "valid": true,
    "zeroUnits": false,
    "zIndexNormalize": false
}

```

# themes/cactus/layout/_partial/comments.ejs

```ejs
<% if(page.comments && theme.disqus.enabled){ %>
    <div class="blog-post-comments">
        <div id="disqus_thread">
            <noscript><%= __('comments.no_js') %></noscript>
        </div>
    </div>
<% } %>
<% if(page.comments && theme.utterances.enabled){ %>
    <div class="blog-post-comments">
        <div id="utterances_thread">
            <noscript><%= __('comments.no_js') %></noscript>
        </div>
    </div>
<% } %>
```

# themes/cactus/layout/_partial/footer.ejs

```ejs

<footer id="footer">

  <div class="footer-coffee">
    <p>If you like what I write or the code I create please consider buying me a coffee. It's a small gesture but it helps me keep going. Thank you!</p>
    <a href="https://www.buymeacoffee.com/drkpxl" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
  </div>


  <div class="footer-left">
    <%= __('footer.copyright') %> &copy;
    <% var endYear = (theme.copyright && theme.copyright.end_year) ? theme.copyright.end_year : new Date().getFullYear() %>
    <% var startYear = (theme.copyright && theme.copyright.start_year) ? theme.copyright.start_year : new Date().getFullYear() %>
    <%= startYear >= endYear ? endYear : startYear + "-" + endYear %>

  </div>
  <div class="footer-right">
    <nav>
      <ul>
        <% for (var i in theme.nav) { %><!--
       --><li><a href="<%- url_for(theme.nav[i]) %>"><%= __('nav.'+i).replace("nav.", "") %></a></li><!--
     --><% } %>
      </ul>
    </nav>
  </div>
</footer>

```

# themes/cactus/layout/_partial/google_analytics.ejs

```ejs
<!-- Google Analytics -->
<% if (theme.google_analytics.enabled && theme.google_analytics.id){ %>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<%= theme.google_analytics.id %>"></script>
  <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '<%= theme.google_analytics.id %>');
  </script>
<% } %>

```

# themes/cactus/layout/_partial/head.ejs

```ejs
<head>
    <!-- so meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="True">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    <%- open_graph({
        image:          thumbnail(page),
        fb_app_id:      theme.open_graph.fb_app_id,
        fb_admins:      theme.open_graph.fb_admins,
        twitter_id:     theme.open_graph.twitter_id,
        google_plus:    theme.open_graph.google_plus,
    }) %>
    <%- meta(page) %>
    <% if (theme.favicon) { %>
      <% if (theme.favicon.desktop) { %>
        <% if (theme.gravatar && (theme.gravatar.email || theme.gravatar.hash) && theme.favicon.desktop.gravatar) { %>
          <% if (theme.gravatar.email) { %>
            <link rel="shortcut icon" href="<%= gravatar(theme.gravatar.email, 48) %>">
          <% } else { %>
            <link rel="shortcut icon" href="https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=48">
          <% } %>
        <% } else { %>
          <link rel="shortcut icon" href="<%= url_for(theme.favicon.desktop.url) %>">
        <% } %>
      <% } %>
      <% if (theme.favicon.android) { %>
        <% if (theme.gravatar && (theme.gravatar.email || theme.gravatar.hash) && theme.favicon.android.gravatar) { %>
          <% if (theme.gravatar.email) { %>
            <link rel="icon" type="image/png" href="<%= gravatar(theme.gravatar.email, 192) %>" sizes="192x192">
          <% } else { %>
            <link rel="icon" type="image/png" href="https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=192">
          <% } %>
        <% } else { %>
          <link rel="icon" type="image/png" href="<%= url_for(theme.favicon.android.url) %>" sizes="192x192">
        <% } %>
      <% } %>
      <% if (theme.favicon.apple) { %>
        <% if (theme.gravatar && (theme.gravatar.email || theme.gravatar.hash) && theme.favicon.apple.gravatar) { %>
          <% if (theme.gravatar.email) { %>
            <link rel="apple-touch-icon" sizes="180x180" href="<%= gravatar(theme.gravatar.email, 180) %>">
          <% } else { %>
            <link rel="apple-touch-icon" size="180x180" href="https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=180">
          <% } %>
        <% } else { %>
          <link rel="apple-touch-icon" sizes="180x180" href="<%= url_for(theme.favicon.apple.url) %>">
        <% } %>
      <% } %>
    <% } %>
    <!-- title -->
    <title><%= page_title() %></title>
    <!-- async scripts -->
    <%- partial('./google_analytics.ejs') %>
    <!-- styles -->
    <%- css('css/style') %>
    <!-- persian styles -->
    <% if (theme.direction && theme.direction === 'rtl') { %>
      <%- css('css/rtl') %>
    <% } %>
    <!-- rss -->
    <% if (theme.rss === '' && config.feed && config.feed.path) { %>
      <% theme.rss = config.feed.path %>
    <% } %>
    <% if (theme.rss) { %>
      <link rel="alternate" href="<%= url_for(theme.rss) %>" title="<%= config.title %>" type="application/atom+xml" />
    <% } %>


</head>

```

# themes/cactus/layout/_partial/header.ejs

```ejs
<header id="header">
  <a class="u-url u-uid" href="<%- url_for("/") %>">
  <% if (theme.logo && theme.logo.enabled) { %>
    <% if (theme.gravatar && (theme.gravatar.email || theme.gravatar.hash) && theme.logo.gravatar) { %>
      <% if (theme.gravatar.email) { %>
        <img id="logo" alt class="u-logo"
          srcset="<%- gravatar(theme.gravatar.email) %>?s=<%= theme.logo.width %>, <%- gravatar(theme.gravatar.email) %>?s=<%= theme.logo.width*1.5 %> 1.5x, <%- gravatar(theme.gravatar.email) %>?s=<%= theme.logo.width*2 %> 2x"
          src="<%- gravatar(theme.gravatar.email) %>" />
      <% } else { %>
        <img id="logo" alt class="u-logo"
          srcset="https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=<%= theme.logo.width %>, https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=<%= theme.logo.width*1.5 %> 1.5x, https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>?s=<%= theme.logo.width*2 %> 2x"
          src="https://www.gravatar.com/avatar/<%= theme.gravatar.hash %>" />
      <% } %>
    <% } else { %>
      <img id="logo" alt class="u-logo" src="<%- url_for(theme.logo.url) %>" />
    <% } %>
  <% } %>
    <div id="title">
      <h1 class="p-name"><%= config.title %></h1>
    </div>
  </a>
  <div id="nav">
    <ul>
      <% for (var i in theme.nav) { %>
        <li><a href="<%- url_for(theme.nav[i]) %>"><%= __('nav.'+i).replace("nav.", "") %></a></li>
      <% } %>
    </ul>
  </div>
</header>
```

# themes/cactus/layout/_partial/pagination.ejs

```ejs
<% if (page.total > 1) { %>
    <div class="pagination">
        <% if (page.prev) { %>
            <a href="<%- url_for(page.prev_link) %>"><i class="fa-solid fa-angle-left"></i></a>
        <% } %>
        <span class="page-number"><%= __('pagination.page', page.current, page.total) %></span>
        <% if (page.next) { %>
            <a href="<%- url_for(page.next_link) %>"><i class="fa-solid fa-angle-right"></i>
            </a>
        <% } %>
    </div>
<% } %>

```

# themes/cactus/layout/_partial/post/actions_desktop.ejs

```ejs
<div id="header-post">
  <a id="menu-icon" href="#" aria-label="<%- __('icons.menu') %>"><i class="fa-solid fa-bars fa-lg"></i></a>
  <a id="menu-icon-tablet" href="#" aria-label="<%- __('icons.menu') %>"><i class="fa-solid fa-bars fa-lg"></i></a>
  <a id="top-icon-tablet" href="#" aria-label="<%- __('icons.top') %>" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');" style="display:none;"><i class="fa-solid fa-chevron-up fa-lg"></i></a>
  <span id="menu">
    <span id="nav">
      <ul>
        <% for (var i in theme.nav) { %><!--
       --><li><a href="<%- url_for(theme.nav[i]) %>"><%= __('nav.'+i).replace("nav.", "") %></a></li><!--
     --><% } %>
      </ul>
    </span>
    <br/>
    <span id="actions">
      <ul>
        <% if (page.prev) { %>
        <li><a class="icon" aria-label="<%- __('post.desktop.previous') %>" href="<%- url_for(page.prev.path) %>"><i class="fa-solid fa-chevron-left" aria-hidden="true" onmouseover="$('#i-prev').toggle();" onmouseout="$('#i-prev').toggle();"></i></a></li>
        <% } %>
        <% if (page.next) { %>
        <li><a class="icon" aria-label="<%- __('post.desktop.next') %>" href="<%- url_for(page.next.path) %>"><i class="fa-solid fa-chevron-right" aria-hidden="true" onmouseover="$('#i-next').toggle();" onmouseout="$('#i-next').toggle();"></i></a></li>
        <% } %>
        <li><a class="icon" aria-label="<%- __('post.desktop.back_to_top') %>" href="#" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');"><i class="fa-solid fa-chevron-up" aria-hidden="true" onmouseover="$('#i-top').toggle();" onmouseout="$('#i-top').toggle();"></i></a></li>
        <li><a class="icon" aria-label="<%- __('post.desktop.share') %>" href="#"><i class="fa-solid fa-share-alt" aria-hidden="true" onmouseover="$('#i-share').toggle();" onmouseout="$('#i-share').toggle();" onclick="$('#share').toggle();return false;"></i></a></li>
      </ul>
      <span id="i-prev" class="info" style="display:none;"><%= __('post.desktop.previous') %></span>
      <span id="i-next" class="info" style="display:none;"><%= __('post.desktop.next') %></span>
      <span id="i-top" class="info" style="display:none;"><%= __('post.desktop.back_to_top') %></span>
      <span id="i-share" class="info" style="display:none;"><%= __('post.desktop.share') %></span>
    </span>
    <br/>
    <div id="share" style="display: none">
      <%- partial('_partial/post/share', { icon_class_name: '' }) %>
    </div>
    <% let tocHTML = toc(page.content) %>
    <% if (tocHTML !== '') { %>
      <div id="toc">
        <%- tocHTML %>
      </div>
    <% } %>
  </span>
</div>

```

# themes/cactus/layout/_partial/post/actions_mobile.ejs

```ejs
<div id="footer-post-container">
  <div id="footer-post">

    <div id="nav-footer" style="display: none">
      <ul>
        <% for (var i in theme.nav) { %>
          <li><a href="<%- url_for(theme.nav[i]) %>"><%= __('nav.'+i).replace("nav.", "") %></a></li>
        <% } %>
      </ul>
    </div>

    <% let tocHTML = toc(page.content) %>
    <% if (tocHTML !== '') { %>
      <div id="toc-footer" style="display: none">
        <%- toc(page.content) %>
      </div>
    <% } %>

    <div id="share-footer" style="display: none">
      <%- partial('_partial/post/share', { icon_class_name: 'fa-lg' }) %>
    </div>

    <div id="actions-footer">
        <a id="menu" class="icon" href="#" onclick="$('#nav-footer').toggle();return false;"><i class="fa-solid fa-bars fa-lg" aria-hidden="true"></i> <%= __('post.mobile.menu') %></a>
        <% if (tocHTML !== '') { %>
          <a id="toc" class="icon" href="#" onclick="$('#toc-footer').toggle();return false;"><i class="fa-solid fa-list fa-lg" aria-hidden="true"></i> <%= __('post.mobile.toc') %></a>
        <% } %>
        <a id="share" class="icon" href="#" onclick="$('#share-footer').toggle();return false;"><i class="fa-solid fa-share-alt fa-lg" aria-hidden="true"></i> <%= __('post.mobile.share') %></a>
        <a id="top" style="display:none" class="icon" href="#" onclick="$('html, body').animate({ scrollTop: 0 }, 'fast');"><i class="fa-solid fa-chevron-up fa-lg" aria-hidden="true"></i> <%= __('post.mobile.back_to_top') %></a>
    </div>

  </div>
</div>

```

# themes/cactus/layout/_partial/post/category.ejs

```ejs
<% if (page.categories && page.categories.length) { %>
    <div class="article-category">
        <i class="fa-solid fa-archive"></i>
        <%- list_categories(page.categories, { show_count: false, style: 'link', separator: ' › ' }) %>
    </div>
<% } %>

```

# themes/cactus/layout/_partial/post/date.ejs

```ejs
<% if (post.date) { %>
    <div class="<%= class_name %>">
      <% if (is_post()) { %>
        <time datetime="<%= date_xml(post.date) %>" class="dt-published" itemprop="datePublished"><%= date(post.date, config.date_format) %></time>
        <% if (theme.post.show_updated && post.date !== post.updated) { %>
        (Updated: <time datetime="<%= date_xml(post.updated) %>" class="dt-updated" itemprop="dateModified"><%= date(post.updated, config.date_format) %></time>)
        <% } %>
      <% } else { %>
        <% if (is_home() && theme.posts_overview.sort_updated || is_archive() && theme.archive.sort_updated ) { %>
          <time datetime="<%= date_xml(post.updated) %>" class="dt-updated" itemprop="dateModified"><%= date(post.updated, config.date_format) %></time>
        <% } else { %>
          <time datetime="<%= date_xml(post.date) %>" class="dt-published" itemprop="datePublished"><%= date(post.date, config.date_format) %></time>
        <% } %>
      <% } %>
    </div>
<% } %>

```

# themes/cactus/layout/_partial/post/gallery.ejs

```ejs
<% if (page.photos && page.photos.length) { %>
<div class="article-gallery">
    <% page.photos.forEach(function(photo, i) { %>
    <a class="gallery-item" href="<%- url_for(photo) %>" rel="gallery_<%= page._id %>">
        <img src="<%- url_for(photo) %>" itemprop="image" />
    </a>
    <% }) %>
</div>
<% } %>

```

# themes/cactus/layout/_partial/post/share.ejs

```ejs
<ul>
  <li><a class="icon" href="http://www.facebook.com/sharer.php?u=<%= page.permalink %>"><i class="fab fa-facebook <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="https://twitter.com/share?url=<%= page.permalink %>&text=<%= page.title %>"><i class="fab fa-twitter <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="http://www.linkedin.com/shareArticle?url=<%= page.permalink %>&title=<%= page.title %>"><i class="fab fa-linkedin <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="https://pinterest.com/pin/create/bookmarklet/?url=<%= page.permalink %>&is_video=false&description=<%= page.title %>"><i class="fab fa-pinterest <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="mailto:?subject=<%= page.title %>&body=Check out this article: <%= page.permalink %>"><i class="fa-solid fa-envelope <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="https://getpocket.com/save?url=<%= page.permalink %>&title=<%= page.title %>"><i class="fab fa-get-pocket <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="http://reddit.com/submit?url=<%= page.permalink %>&title=<%= page.title %>"><i class="fab fa-reddit <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="http://www.stumbleupon.com/submit?url=<%= page.permalink %>&title=<%= page.title %>"><i class="fab fa-stumbleupon <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="http://digg.com/submit?url=<%= page.permalink %>&title=<%= page.title %>"><i class="fab fa-digg <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="http://www.tumblr.com/share/link?url=<%= page.permalink %>&name=<%= page.title %>&description=<%= page.excerpt %>"><i class="fab fa-tumblr <%= icon_class_name %>" aria-hidden="true"></i></a></li>
  <li><a class="icon" href="https://news.ycombinator.com/submitlink?u=<%= page.permalink %>&t=<%= page.title %>"><i class="fab fa-hacker-news <%= icon_class_name %>" aria-hidden="true"></i></a></li>
</ul>

```

# themes/cactus/layout/_partial/post/tag.ejs

```ejs
<% if (page.tags && page.tags.length) { %>
    <div class="article-tag">
        <i class="fa-solid fa-tag"></i>
        <%- list_tags(page.tags, { show_count: false, style: 'link', class: {a: 'p-category' }}) %>
    </div>
<% } %>

```

# themes/cactus/layout/_partial/post/title.ejs

```ejs
<% if (index) { %>
    <% if (post.link) { %>
        <a class="<%= class_name %>" href="<%- url_for(post.link) %>" target="_blank" itemprop="url"><%= post.title %></a>
    <% } else if (post.title) { %>
        <a class="<%= class_name %>" href="<%- url_for(post.path) %>"><%= post.title %></a>
    <% } else { %>
        <a class="<%= class_name %>" href="<%- url_for(post.path) %>">Untitled</a>
    <% } %>
<% } else { %>
    <h1 class="<%= class_name %> p-name" itemprop="name headline">
        <%= post.title %>
    </h1>
<% } %>


```

# themes/cactus/layout/_partial/scripts.ejs

```ejs
<!-- jquery -->
<% if (isCdnEnable('jquery')) {%>
  <%- getCdnScript('jquery') %>
<% } else { %>
  <%- js('lib/jquery/jquery.min') %>
<% } %>


<!-- clipboard -->
<% if (is_post()){ %>
  <% if (isCdnEnable('clipboard')) { %>
    <%- getCdnScript('clipboard') %>
  <% } else { %>
    <%- js('lib/clipboard/clipboard.min') %>
  <% } %>
  <script type="text/javascript">
  $(function() {
    // copy-btn HTML
    var btn = "<span class=\"btn-copy tooltipped tooltipped-sw\" aria-label=\"<%= __('tooltip.copy_tip') %>\">";
    btn += '<i class="fa-regular fa-clone"></i>';
    btn += '</span>';
    // mount it!
    $(".highlight table").before(btn);
    var clip = new ClipboardJS('.btn-copy', {
      text: function(trigger) {
        return Array.from(trigger.nextElementSibling.querySelectorAll('.code')).reduce((str,it)=>str+it.innerText+'\n','')
      }
    });
    clip.on('success', function(e) {
      e.trigger.setAttribute('aria-label', "<%= __('tooltip.copied') %>");
      e.clearSelection();
    })
  })
  </script>
<% } %>
<%- js('js/main') %>
<!-- search -->
<% if (config.search && (page.search || page.type === "search")){ %>
  <%- js('js/search.js') %>
  <script type="text/javascript">
  $(function() {

    var $inputArea = $("input#search-input");
    var $resultArea = document.querySelector("div#search-result");

    $inputArea.focus(function() {
      var search_path = "<%= config.search.path %>";
      if (search_path.length == 0) {
        search_path = "search.xml";
      }
      var path = "<%= config.root %>" + search_path;
      searchFunc(path, 'search-input', 'search-result');
    });

    $inputArea.keydown(function(e) {
      if (e.which == 13) {
        e.preventDefault();
      }
    });

    var observer = new MutationObserver(function(mutationsList, observer) {
      if (mutationsList.length == 1) {
        if (mutationsList[0].addedNodes.length) {
          $(".search-no-result").hide();
        } else if (mutationsList[0].removedNodes.length) {
          $(".search-no-result").show(200);
        }
      }
    });

    observer.observe($resultArea, { childList: true });

  });
  </script>
<% } %>
<!-- Baidu Analytics -->
<% if (theme.baidu_analytics.enabled && theme.baidu_analytics.id){ %>
  <script type="text/javascript">
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?<%= theme.baidu_analytics.id %>";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
<% } %>
<!-- Cloudflare Analytics -->
<% if (theme.cloudflare_analytics.enabled && theme.cloudflare_analytics.id){ %>
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "<%= theme.cloudflare_analytics.id %>"}'></script>
<% } %>
<!-- Disqus Comments -->
<% if (page.comments && theme.disqus.enabled && theme.disqus.shortname){ %>
    <script type="text/javascript">
        var disqus_shortname = '<%= theme.disqus.shortname %>';

        (function(){
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/<% if (page.comments){ %>embed.js<% } else { %>count.js<% } %>';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        }());
    </script>
<% } %>

<!-- utterances Comments -->
<% if (page.comments && theme.utterances.enabled && theme.utterances.repo && theme.utterances.issue_term && theme.utterances.theme){ %>
    <script type="text/javascript">
      var utterances_repo = '<%= theme.utterances.repo %>';
      var utterances_issue_term = '<%= theme.utterances.issue_term %>';
      var utterances_label = '<%= theme.utterances.label %>';
      var utterances_theme = '<%= theme.utterances.theme %>';

      (function(){
          var script = document.createElement('script');

          script.src = 'https://utteranc.es/client.js';
          script.setAttribute('repo', utterances_repo);
          script.setAttribute('issue-term', 'pathname');
          script.setAttribute('label', utterances_label);
          script.setAttribute('theme', utterances_theme);
          script.setAttribute('crossorigin', 'anonymous');
          script.async = true;
          (document.getElementById('utterances_thread')).appendChild(script);
      }());
  </script>
<% } %>
```

# themes/cactus/layout/_partial/search.ejs

```ejs
<section id="search">
  <form>
    <input type="text" class="search-input" id="search-input" placeholder="<%= __('search.search') %>">
  </form>
  <div id="search-result"></div>
  <p class="search-no-result"><%= __('search.no_results') %></p>
</section>

```

# themes/cactus/layout/_partial/styles.ejs

```ejs
<!-- styles -->
<% if (page.photos && page.photos.length) { %>
  <% if (isCdnEnable('justified_gallery_css')) { %>
    <%- getCdnLink('justified_gallery_css', {preload: true}) %> 
  <% } else { %> 
    <link
      rel="preload"
      href="<%- url_for('/lib/justified-gallery/css/justifiedGallery.min.css') %>"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"/>
    <noscript>
      <link
        rel="stylesheet"
        href="<%- url_for('/lib/justified-gallery/css/justifiedGallery.min.css')  %>"/>
    </noscript>
  <% } %> 
<% } %>

<% if (isCdnEnable('font_awesome')) { %>
  <%- getCdnLink('font_awesome', {preload: true}) %>
<% } else { %> 
  <link
    rel="preload"
    href="<%- url_for('/lib/font-awesome/css/all.min.css') %>"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript
    ><link
      rel="stylesheet"
      href="<%- url_for('/lib/font-awesome/css/all.min.css') %>"
  /></noscript>
<% } %>

```

# themes/cactus/layout/_partial/umami_analytics.ejs

```ejs
<!-- Umami Analytics -->
<% if (theme.umami_analytics.enabled && theme.umami_analytics.id && theme.umami_analytics.host && theme.umami_analytics.script_name){ %>
    <script async defer
            data-website-id="<%= theme.umami_analytics.id %>"
            src="<%= theme.umami_analytics.host %>/<%= theme.umami_analytics.script_name %>">
    </script>
<% } %>

```

# themes/cactus/layout/404.ejs

```ejs
<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
    <%- partial('_partial/post/gallery') %>
    <div class="content" itemprop="articleBody">
        <% if (theme.error_404.enabled && theme.error_404.title && theme.error_404.description ) { %>
            <h1><%= theme.error_404.title %></h1>
            <p><%= theme.error_404.description %></p>
        <% } %>
    </div>
</article>
```

# themes/cactus/layout/archive.ejs

```ejs
<div id="archive">
  <ul class="post-list">
    <% var year = 0 %>
    <% var change = false %>
    <% var field_sort = theme.archive.sort_updated ? 'updated' : 'date' %>
    <% page.posts.sort(field_sort, 'desc').each(function(post) { %>
      <% var itemYear = date(post[field_sort], 'YYYY') %>
      <% change = year !== itemYear %>
      <% year = change ? itemYear : year %>
      <% if (change) { %>
        <li class="post-year"><h2><%= year %></h2></li>
      <% } %>
      <li class="post-item">
        <%- partial('_partial/post/date', { post: post, class_name: 'meta' }) %>
        <span><%- partial('_partial/post/title', { post: post, index: true, class_name: '' }) %></span>
      </li>
    <% }); %>
  </ul>
  <%- partial('_partial/pagination') %>
</div>

```

# themes/cactus/layout/index.ejs

```ejs
<section id="about" class="p-note">
  <% if (config.description) { %>
    <%- markdown(config.description) %>
  <% } %>
  <% if (theme.social_links) { %>
    <p>
      <%= __('index.find_me_on') %>
      <% var nb_links = theme.social_links.length %>
      <% var i = 0 %>
      <% for(var {label, icon, link} of theme.social_links) { %>
        <% var title = label || icon %>
        <% if (icon == 'mail') { %>
          <a class="icon u-email" target="_blank" rel="noopener" href="<%- link %>" aria-label="<%- title %>" title="<%- title %>">
            <i class="fa-solid fa-envelope"></i><!--
      ---></a>
        <% } else if (icon == 'rss') { %>
          <a class="icon" target="_blank" rel="noopener" href="<%- link %>" aria-label="<%- title %>" title="<%- title %>">
            <i class="fa-solid fa-rss"></i>
          </a>
        <% } else { %>
          <a class="icon u-url" target="_blank" rel="noopener me" href="<%- url_for(link) %>" aria-label="<%- title %>" title="<%- title %>">
            <i class="fa-brands fa-<%= icon %>"></i><!--
      ---></a><!--
    ---><% } %><!--
    ---><%= ( nb_links > 0 && i < nb_links-1 ?
            ( i == nb_links-2 ? ' '+__('index.enum_and')+' '
            : __('index.enum_comma')+' ' )
            : '.' ) %>
        <% i+=1 %>
      <% } %>
    </p>
  <% } %>
</section>

<section id="writing">
  <span class="h1"><a href="<%- url_for(theme.nav.articles) %>"><%= __('index.articles') %></a></span>
  <% if (theme.tags_overview && site.tags.length) { %>
  <span class="h2"><%= __('index.topics') %></span>
  <span class="widget tagcloud">
    <%- tagcloud(theme.tags_overview) %>
  </span>
  <span class="h2"><%= __('index.most_recent') %></span>
  <% } %>
  <ul class="post-list">
    <% var field_sort = theme.posts_overview.sort_updated ? 'updated' : 'date' %>
    <% if (theme.posts_overview.show_all_posts) { %>
      <% var show_posts = page.posts.sort(field_sort, 'desc') %>
    <% } else { %>
      <% var show_posts = site.posts.sort(field_sort, 'desc').limit(theme.posts_overview.post_count || 5) %>
    <% } %>
    <% show_posts.each(function(post, i){ %>
      <li class="post-item">
        <%- partial('_partial/post/date', { post: post, class_name: 'meta' }) %>
        <span><%- partial('_partial/post/title', { post: post, index: true, class_name: '' }) %></span>
      </li>
    <% }); %>
  </ul>
  <% if (theme.posts_overview.show_all_posts) { %>
    <%- partial('_partial/pagination') %>
  <% } %>
</section>

<% if (site.data.projects) { %>
  <section id="projects">
    <span class="h1"><a href="<%- url_for(theme.projects_url) %>"><%= __('index.projects') %></a></span>
    <ul class="project-list">
      <% for(var obj in site.data.projects){ %>
        <li class="project-item">
          <a href="<%= site.data.projects[obj].url %>" 
             target="_blank" 
             rel="noopener" 
             aria-label="Open <%= site.data.projects[obj].name %> project in new tab">
             <%= site.data.projects[obj].name %></a>: &nbsp;<%- markdown(site.data.projects[obj].desc) %>
        </li>
      <% } %>
    </ul>
  </section>
  <% } %>

```

# themes/cactus/layout/layout.ejs

```ejs
<!DOCTYPE html>
<html<%= config.language ? " lang=" + config.language.substring(0, 2) : ""%>>
<%- partial('_partial/head') %>
<body class="max-width mx-auto px3 <%- theme.direction -%>">
    <div class="content index py4 <%= is_home() ? 'h-card' : '' %>">
        <%- partial('_partial/header') %>
        <%- body %>
        <%- partial('_partial/footer') %>
    </div>
    <%- partial('_partial/styles') %>
    <%- partial('_partial/scripts') %>
</body>
</html>
```

# themes/cactus/layout/page.ejs

```ejs
<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
  <%- partial('_partial/post/gallery') %>
  <div class="content" itemprop="articleBody">
      <% if (page.search || page.type === "search") { %>
        <%- partial('_partial/search') %>
      <% } else if (page.type === "tags") { %>
          <div id="tag-cloud">
            <div class="tag-cloud-title">
                <% var visibleTags = 0 %>
                <% site.tags.each(function(tag){ %>
                  <% if (tag.length) { %>
                    <% visibleTags += 1 %>
                  <% } %>
                <% }) %>
                <%- _p('counter.tag_cloud', visibleTags) %>
            </div>
            <div class="tag-cloud-tags">
              <%- tagcloud({min_font: 12, max_font: 30, amount: 300}) %>
            </div>
          </div>
        <% } else if (page.type === 'categories') { %>
          <div id="categories">
            <div class="category-list-title">
                <% var visibleCategories = 0 %>
                <% site.categories.each(function(cat){ %>
                  <% if (cat.length) { %>
                    <% visibleCategories += 1 %>
                  <% } %>
                <% }) %>
                <%- _p('counter.categories', visibleCategories) %>
            </div>
            <div class="category-list">
              <%- list_categories() %>
            </div>
          </div>
        <% } else { %>
          <%- page.content %>
        <% } %>
  </div>
</article>

```

# themes/cactus/layout/post.ejs

```ejs
<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
  <header>
    <%- partial('_partial/post/title', { post: page, index: false, class_name: 'posttitle' }) %>
    <div class="meta">

    </div>
  </header>
  <%- partial('_partial/post/gallery') %>
  <div class="content e-content" itemprop="articleBody">
    <%- page.content %>
  </div>
</article>
<%- partial('_partial/comments') %>

```

# themes/cactus/package.json

```json
{
  "name": "hexo-theme-cactus",
  "version": "3.0.0",
  "description": "A responsive, clean and simple theme for Hexo.",
  "main": "index.js",
  "scripts": {
    "lint": "gulp lint --silent",
    "test": "gulp validate --silent",
    "clean": "stylus-supremacy format source/css/**/*.styl --options .stylintrc -r"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/probberechts/cactus-dark.git"
  },
  "keywords": [
    "Hexo",
    "Theme",
    "Cactus"
  ],
  "author": "Pieter Robberechts",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/probberechts/cactus-dark/issues"
  },
  "homepage": "https://github.com/probberechts/cactus-dark#readme",
  "type": "module",
  "devDependencies": {
    "del": "*",
    "gulp": "^4.0.0",
    "gulp-decompress": "*",
    "gulp-download-stream": "*",
    "gulp-jshint": "*",
    "gulp-stylint": "*",
    "js-yaml": "*",
    "jshint": "^2.9.6",
    "jshint-stylish": "*",
    "stylelint-formatter-pretty": "^3.1.0",
    "stylint": "*",
    "stylus-supremacy": "^2.12.2"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "*",
    "clipboard": "^2.0.4",
    "jquery": "^3.3.1",
    "vazir-font": "*"
  }
}

```

# themes/cactus/scripts/cdn.js

```js
/**
 * returns true if cdn is enabled and there's an entry for the specified
 * resource
 */
hexo.extend.helper.register('isCdnEnable', function (resource) {
  return (
    hexo.theme.config.cdn &&
    hexo.theme.config.cdn.enable &&
    hexo.theme.config.cdn[resource]
  );
});

/**
 * returns the script tag to load the specified resource from a CDN
 */
hexo.extend.helper.register('getCdnScript', function (resource) {
  return `<script src="${hexo.theme.config.cdn[resource]}" crossorigin="anonymous"></script>`;
});

/**
 * returns the link tag to load the specified resource from a CDN
 */
hexo.extend.helper.register('getCdnLink', function (resource, options) {
  options = options || {};
  if (options.preload) {
    return `<link rel="preload" as="style" href="${hexo.theme.config.cdn[resource]}" crossorigin="anonymous" onload="this.onload=null;this.rel='stylesheet'"/>`
  }
  return `<link rel="stylesheet" href="${hexo.theme.config.cdn[resource]}" crossorigin="anonymous" />`;
});

```

# themes/cactus/scripts/error_404.js

```js
/**
* error 404 page Generator
* @description generate the 404.html in root directory
*/

hexo.extend.generator.register('error_404', function (locals) {
    return {
        path: '404.html',
        data: locals.posts,
        layout: '404'
    }
})
```

# themes/cactus/scripts/merge-configs.js

```js
/**
* Merge all `theme_config.*` options from main Hexo config into hexo.theme.config.
* This fixes an issue with hexo-renderer-stylus, which otherwise ignores these
* configuration overrides.
*/
hexo.on('generateBefore', function () {
  hexo.theme.config = Object.assign({}, hexo.theme.config, hexo.config.theme_config);
});

```

# themes/cactus/scripts/meta.js

```js
/**
* Meta Helper
* @description Generate meta tags for HTML header
* @example
*     <%- meta(post) %>
*/
function trim (str) {
    return str.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

function split (str, sep) {
    var result = [];
    var matched = null;
    while (matched = sep.exec(str)) {
        result.push(matched[0]);
    }
    return result;
}

hexo.extend.helper.register('meta', function (post) {
    var metas = post.meta || [];
    var metaDOMArray = metas.map(function (meta) {
        var entities = split(meta, /(?:[^\\;]+|\\.)+/g);
        var entityArray = entities.map(function (entity) {
            var keyValue = split(entity, /(?:[^\\=]+|\\.)+/g);
            if (keyValue.length < 2) {
                return null;
            }
            var key = trim(keyValue[0]);
            var value = trim(keyValue[1]);
            return key + '="' + value + '"';
        }).filter(function (entity) {
            return entity;
        });
        return '<meta ' + entityArray.join(' ') + ' />';
    });
    return metaDOMArray.join('\n');
});

```

# themes/cactus/scripts/page_title.js

```js
/**
 * Page Title Helper
 * @description Generate page title.
 * @example
 *     <%- page_title() %>
 */
hexo.extend.helper.register("page_title", function () {
  var title = this.page.title ? this.page.title : this.config.title;

  if (this.is_archive()) {
    title = this.__("nav.articles");

    if (this.is_month()) {
      title += ": " + this.page.year + "/" + this.page.month;
    } else if (this.is_year()) {
      title += ": " + this.page.year;
    }
  } else if (this.is_category()) {
    title = this.__("nav.category") + ": " + this.page.category;
  } else if (this.is_tag()) {
    title = this.__("nav.tag") + ": " + this.page.tag;
  }

  return title;
});

```

# themes/cactus/scripts/thumbnail.js

```js
/**
* Thumbnail Helper
* @description Get the thumbnail url from a post
* @example
*     <%- thumbnail(post) %>
*/
hexo.extend.helper.register('thumbnail', function (post) {
    return post.thumbnail || post.banner || '';
});

```

# themes/cactus/source/css/_colors/classic.styl

```styl
$color-background = #fafafa
$color-footer-mobile-1 = darken($color-background, 2%)
$color-footer-mobile-2 = darken($color-background, 10%)
$color-background-code = darken($color-background, 2%)
$color-border = #666
$color-scrollbar = #AAA
$color-meta = #666
$color-meta-code = lighten($color-meta, 10%)
$color-link = rgba(86, 124, 119, .4)
$color-text = #22272a
$color-accent-1 = #cc2a41
$color-accent-2 = rgba(86, 124, 119, .8)
$color-accent-3 = #666
$color-quote = #cc2a41
$highlight = hexo-config("highlight") || "github"

```

# themes/cactus/source/css/_colors/dark.styl

```styl
$color-background = #1d1f21
$color-footer-mobile-1 = lighten($color-background, 2%)
$color-footer-mobile-2 = lighten($color-background, 10%)
$color-background-code = lighten($color-background, 2%)
$color-border = #908d8d
$color-scrollbar = #999
$color-meta = #908d8d
$color-meta-code = #908d8d
$color-link = rgba(212, 128, 170, 1)
$color-text = #c9cacc
$color-accent-3 = #cccccc
$color-accent-2 = #eeeeee
$color-accent-1 = #2bbc8a
$color-quote = #ccffb6
$highlight = hexo-config("highlight") || "rainbow"

```

# themes/cactus/source/css/_colors/light.styl

```styl
// by @GabiThume (https://github.com/gabithume)
$color-background = #e2e0de
$color-footer-mobile-1 = darken($color-background, 2%)
$color-footer-mobile-2 = darken($color-background, 10%)
$color-background-code = darken($color-background, 2%)
$color-border = #666
$color-scrollbar = #999
$color-meta = #666
$color-meta-code = lighten($color-meta, 10%)
$color-link = rgba(43, 188, 138, 1)
$color-text = #363533
$color-accent-3 = #666666
$color-accent-2 = #111111
$color-accent-1 = #d44375
$color-quote = #ab2251
$highlight = hexo-config("highlight") || "github"

```

# themes/cactus/source/css/_colors/paper.styl

```styl
// by @drkpxl (https://github.com/drkpxl)
$color-background = #FAF5EC // Lighter cream background
$color-footer-mobile-1 = darken($color-background, 2%)
$color-footer-mobile-2 = darken($color-background, 10%)
$color-border = #96572D // Using accent color for borders
$color-scrollbar = #7C4011 // Using link color for scrollbar
$color-meta = #7C4011 // Using link color for meta
$color-meta-code = lighten($color-meta, 10%)
$color-link = #8B5E34 // Darker caramel for links
$color-text = #1F1408 // Darker espresso text
$color-accent-3 = #96572D // Darker café au lait
$color-accent-2 = #7C4011 // Darker caramel
$color-accent-1 = #96572D // Darker café au lait
$color-quote = #7C4011 // Using link color for quotes
$highlight = hexo-config("highlight") || "github"
```

# themes/cactus/source/css/_colors/paperdark.styl

```styl
// Updated Stylus File by @drkpxl
$color-background = #1a1f24 // Rich dark background
$color-footer-mobile-1 = #242b33 // Subtle gradient for mobile footer
$color-footer-mobile-2 = #2d363f // Deeper gradient for mobile footer
$color-border = #5d7a8c // Muted blue-gray for borders
$color-scrollbar = #64b5f6 // Clear blue for scrollbar
$color-meta = #90caf9 // Light blue for meta text
$color-meta-code = #b3e5fc // Lighter blue for code meta
$color-link = #29b6f6 // Bright blue for links
$color-text = #ffffff // Pure white for maximum readability
$color-accent-3 = #ffd54f // Warm yellow accent - kept for important highlights
$color-accent-2 = #7bb5e3 // Muted blue accent - removed orange
$color-accent-1 = #a0c3e2 // Lighter blue accent - removed green
$color-quote = #e1f5fe // Very light blue for quotes
$highlight = hexo-config("highlight") || "tomorrow-night-blue" // Use github highlighting as default
```

# themes/cactus/source/css/_colors/white.styl

```styl
// by @sergodeeva (https://github.com/sergodeeva)
$color-background = #FFFFFF
$color-footer-mobile-1 = darken($color-background, 2%)
$color-footer-mobile-2 = darken($color-background, 10%)
$color-background-code = darken($color-background, 2%)
$color-border = #666
$color-scrollbar = #AAA
$color-meta = #666
$color-meta-code = lighten($color-meta, 10%)
$color-link = rgba(212, 128, 170, 1)
$color-text = #383838
$color-accent-3 = #8c8c8c
$color-accent-2 = #383838
$color-accent-1 = #2bbc8a
$color-quote = #2bbc8a
$highlight = hexo-config("highlight") || "atelier-cave-light"

```

# themes/cactus/source/css/_extend.styl

```styl
$base-style
  h1, .h1
    display: block
    margin-top: 3rem
    margin-bottom: .5rem
    color: $color-accent-1
    letter-spacing: .02em
    font-weight: 700
    font-style: normal
    font-size: 1.2em

    antialias()

  h2, .h2
    position: relative
    display: block
    margin-top: 2rem
    margin-bottom: .5rem
    color: $color-accent-2
    text-transform: none
    letter-spacing: normal
    font-weight: bold
    font-size: 1.5rem

  h3
    color: $color-accent-2
    text-decoration: underline
    font-weight: bold
    font-size: 1.3rem

  h4
  h5
  h6
    display: inline
    text-decoration: none
    color: $color-accent-3
    font-weight: bold
    font-size: 1.2rem

  h3
  h4
  h5
  h6
    margin-top: .9rem
    margin-bottom: .5rem

  hr
    border: .5px dashed $color-accent-3
    opacity: .5
    margin: 0
    margin-top: 20px
    margin-bottom: 20px

  strong
    font-weight: bold

  em
  cite
    font-style: italic

  sup
  sub
    position: relative
    vertical-align: baseline
    font-size: .8em
    line-height: 0

  sup
    top: -.5em

  sub
    bottom: -.2em

  small
    font-size: .9em

  acronym
  abbr
    border-bottom: 1px dotted

  ul
  ol
  dl
    line-height: $line-height

  ul
  ol
    ul
    ol
      margin-top: 0
      margin-bottom: 0

  ol
    list-style: decimal

  dt
    font-weight: bold

  table
    width: 100%
    border-collapse: collapse
    text-align: left
    font-size: $font-size
    overflow: auto
    display: block

  th
    padding: 8px
    border-bottom: 1px dashed $color-border
    color: $color-accent-2
    font-weight: bold
    font-size: $font-size

  td
    padding: 0 8px
    border-bottom: none

```

# themes/cactus/source/css/_fonts.styl

```styl
@font-face
  font-style: normal
  font-family: "Meslo LG"
  src: local("Meslo LG S"), url("../lib/meslo-LG/MesloLGS-Regular.ttf") format("truetype")

@font-face
  font-style: normal
  font-family: "Atkinson Hyperlegible"
  src: local("Atkinson Hyperlegible"), url("../lib/Atkinson_Hyperlegible/AtkinsonHyperlegible-Regular.ttf") format("truetype")


@font-face
  font-style: normal
  font-family: "Noto Sans Display"
  src: local("Noto Sans Display"), url("../lib/Noto_Sans_Display/NotoSansDisplay-VariableFont_wdth,wght.ttf") format("truetype")



```

# themes/cactus/source/css/_mixins.styl

```styl
antialias()
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased

hyphens($value)
  hyphens: $value
  -moz-hyphens: $value
  -ms-hyphens: $value
  -webkit-hyphens: $value

underline($size, $color)
  background-image: linear-gradient(transparent, transparent $size, $color-accent-2 $size, $color-accent-1)
  background-position: bottom
  background-size: 100% 6px
  background-repeat: repeat-x

no-select()
  user-select: none
  -khtml-user-select: none
  -o-user-select: none
  -moz-user-select: none
  -webkit-user-select: none

```

# themes/cactus/source/css/_partial/archive.styl

```styl
#archive
  .post-year
    list-style-type: none

  .post-list
    padding: 0

    .post-item
      margin-bottom: 1rem
      margin-left: 0
      list-style-type: none

      .meta
        display: block
        margin-right: 16px
        min-width: 100px
        color: $color-meta
        font-size: 14px

  @media (min-width: 480px)
    .post-list
      .post-item
        display: flex
        margin-bottom: 5px
        margin-left: 1rem

        .meta
          text-align: left

```

# themes/cactus/source/css/_partial/article.styl

```styl
article
  header
    .posttitle
      margin-top: 0
      margin-bottom: 0
      text-transform: none
      font-size: 1.5em
      line-height: 1.25

    .meta
      margin-top: 0
      margin-bottom: 1rem

    .meta *
      color: $color-accent-3
      font-size: 1rem

    .author
      text-transform: normal
      letter-spacing: .01em
      font-weight: 400
      

    .postdate
      display: inline

  .content


    img
    video
      display: block
      margin: auto
      max-width: 100%
      height: auto
      border-radius: 30px

    /* http://webdesignerwall.com/tutorials/css-elastic-videos */
    .video-container
      position: relative
      overflow: hidden
      padding-top: (9 / 16 * 100)% // 16:9 ratio
      height: 0

      iframe, object, embed
        position: absolute
        top: 0
        left: 0
        margin-top: 0
        width: 100%
        height: 100%

    blockquote
      margin: 1rem 10px
      padding: .5em 10px
      background: inherit
      color: $color-quote
      quotes: "\201C" "\201D" "\2018" "\2019"
      font-weight: bold

      p
        margin: 0

      &:before
        margin-right: .25em
        color: $color-quote
        content: "\201C"
        vertical-align: -.4em
        font-size: 2em
        line-height: .1em

      footer
        margin: line-height 0
        color: $color-meta
        font-size: 12px

        a
          background-image: linear-gradient(transparent, transparent 5px, $color-meta 5px, $color-meta)
          color: $color-meta

        a:hover
          background-image: linear-gradient(transparent, transparent 4px, lighten($color-meta, 20%) 4px, lighten($color-meta, 20%))
          color: lighten($color-meta, 20%)

        cite
          &:before
            padding: 0 .5em
            content: "—"

    .pullquote
      margin: 0
      width: 45%
      text-align: left

      &.left
        margin-right: 1em
        margin-left: .5em

      &.right
        margin-right: .5em
        margin-left: 1em

    .caption
      position: relative
      display: block
      margin-top: .5em
      color: $color-meta
      text-align: center
      font-size: .9em

.posttitle
  text-transform: none
  font-size: 1.5em
  line-height: 1.25

.article-tag
  .tag-link
    &:before
      content: "#"
    underline(10px, $color-link)

.article-category
  .category-link
    underline(10px, $color-link)

@media (min-width: 480px)
  .article-tag,
  .article-category
    display: inline

    &:before
      content: "|"

```

# themes/cactus/source/css/_partial/categories.styl

```styl
#categories
  .category-list-title
    color: $color-meta
  .category-list
    .category-list-item
      .category-list-count
        color: $color-meta
      .category-list-count:before
        content: " ("
      .category-list-count:after
        content: ")"

```

# themes/cactus/source/css/_partial/comments.styl

```styl
.blog-post-comments
  margin-top: 4rem

```

# themes/cactus/source/css/_partial/footer.styl

```styl
#footer
  border-top: 1px dashed $color-accent-1
  display: flex
  flex-direction: column
  bottom: 0
  margin-bottom: 10px
  width: 100%
  color: $color-meta
  vertical-align: top
  text-align: center
  font-size: 1rem
  margin-top: 100px

  ul
    margin: 0
    padding: 0
    list-style: none
    display: flex
    justify-content: center
    flex-wrap: wrap /* Allows wrapping if content doesn't fit */

  li
    display: inline-block
    margin-right: 15px
    vertical-align: middle

    &:last-child
      margin-right: 0
      border-right: 0

  a
    color: $color-meta
    text-decoration: underline
    background-image: none

  a:hover
    color: lighten($color-meta, 20%)

@media (max-width: 768px)
  #footer
    flex-direction: column
    align-items: center

    ul
      justify-content: center /* Center aligns the list */

    li
      margin-right: 10px /* Adjust spacing for mobile */

```

# themes/cactus/source/css/_partial/header.styl

```styl
#header
  margin: 0 auto 2rem
  width: 100%

  h1, .h1
    margin-top: 0
    margin-bottom: 0
    color: $color-text
    letter-spacing: .01em
    font-weight: 700
    font-style: normal
    font-size: 2rem
    line-height: 2.5rem
    font-family: $font-family-heading

    antialias()

  a
    background: none
    color: inherit
    text-decoration: none

  #logo
    display: inline-block
    float: left
    margin-right: 20px
    width: $logo-width
    height: $logo-height
    border-radius: 5px
    background-size: $logo-width $logo-height
    background-repeat: no-repeat
    if $logo-grayout
      filter: grayscale(100%)
      -webkit-filter: grayscale(100%)

  #nav
    color: $color-accent-1
    letter-spacing: .01em
    font-weight: 200
    font-style: normal
    font-size: 1rem

    ul
      margin: 0
      padding: 0
      list-style-type: none
      line-height: 15px

      a
        margin-right: 15px
        color: $color-accent-1

      a:hover
        underline(5px, $color-accent-1)

      li
        display: inline-block
        margin-right: 15px
        border-right: 1px dotted
        border-color: $color-accent-1
        vertical-align: middle

      li:last-child
        margin-right: 0
        border-right: 0

        a
          margin-right: 0

@media screen and (max-width: 480px)
  #header
    margin-bottom: 1rem
    
    #nav
      ul
        text-align: center
        
      li
        margin-right: 10px
        
        a
          font-size: .9rem
```

# themes/cactus/source/css/_partial/index.styl

```styl
.post-list
  padding: 0

  .post-item
    margin-bottom: 1rem
    margin-left: 0
    list-style-type: none

    .meta
      display: block
      margin-right: 16px
      min-width: 100px
      color: $color-accent-2
      

@media (min-width: 480px)
  .post-list
    .post-item
      display: flex
      margin-bottom: 5px

      .meta
        text-align: left

.project-list
  padding: 0
  list-style: none

  .project-item
    margin-bottom: 15px
    p
      display: inline
    a
      text-decoration-color: lime !important

```

# themes/cactus/source/css/_partial/pagination.styl

```styl
.pagination
  display: inline-block
  margin-top: 2rem
  width: 100%
  text-align: center

  .page-number
    color: $color-text
    font-size: .8rem

  a
    padding: 4px 6px
    border-radius: 5px
    // background-color: $color-accent-1
    background-image: none
    color: $color-text
    text-decoration: none

  a:hover
    background-image: none

  a:hover:not(.active)
    color: $color-accent-2

```

# themes/cactus/source/css/_partial/search.styl

```styl
.search-input
  padding: 4px 7px
  width: 100%
  outline: none
  border: solid 1px $color-accent-3
  border-radius: 5px
  background-color: $color-background
  color: $color-text
  font-size: 1.2rem
  -webkit-border-radius: 5px
  -moz-border-radius: 5px

  &:focus
    border: solid 1px $color-accent-1

#search-result
  ul.search-result-list
    padding: 0
    list-style-type: none

  li
    margin: 2em auto

  a.search-result-title
    background-image: none
    color: $color-text
    text-transform: capitalize
    font-weight: bold
    line-height: 1.2

  p.search-result
    overflow: hidden
    margin: .4em auto
    max-height: 13em
    text-align: justify
    font-size: .8em

  em.search-keyword
    border-bottom: 1px dashed $color-link
    color: $color-link
    font-weight: bold

.search-no-result
  display: none
  padding-bottom: .5em
  color: $color-text

```

# themes/cactus/source/css/_partial/tags.styl

```styl
#tag-cloud
  .tag-cloud-title
    color: $color-meta
  .tag-cloud-tags
    clear: both
    text-align: center
    a
      display: inline-block
      margin: 10px

```

# themes/cactus/source/css/_partial/tooltip.styl

```styl
// ref: https://github.com/primer/primer/blob/master/modules/primer-tooltips/lib/tooltips.scss
.tooltipped
  position: relative
  
// This is the tooltip bubble
.tooltipped::after
  position: absolute
  z-index: 1000000
  display: none
  padding: .2em .5em
  -webkit-font-smoothing: subpixel-antialiased
  color: $color-background
  font-display: swap // @stylint ignore
  font-weight: 400
  font-size: $font-size * 0.8
  font-family: $font-family-body
  line-height: $line-height
  text-rendering: geometricPrecision
  text-align: center
  word-wrap: break-word
  white-space: pre
  content: attr(aria-label)
  background: $color-text
  border-radius: 3px
  opacity: 0
  
// This is the tooltip arrow
.tooltipped::before
  position: absolute
  z-index: 1000001
  display: none
  width: 0
  height: 0
  color: $color-text
  pointer-events: none
  content: ''
  border: 6px solid transparent
  opacity: 0
  
// delay animation for tooltip
@keyframes tooltip-appear
  from
    opacity: 0
  to
    opacity: 1
    
// This will indicate when we'll activate the tooltip
.tooltipped:hover,
.tooltipped:active,
.tooltipped:focus
  &::before,
  &::after
    display: inline-block
    text-decoration: none
    animation-name: tooltip-appear
    animation-duration: 0.1s
    animation-fill-mode: forwards
    animation-timing-function: ease-in
    
// Tooltipped south
.tooltipped-s,
.tooltipped-sw
  &::after
    top: 100%
    right: 50%
    margin-top: 6px
  &::before
    top: auto
    right: 50%
    bottom: -7px
    margin-right: -6px
    border-bottom-color: $color-text
.tooltipped-sw::after
  margin-right: -16px
  
// Move the tooltip body to the center of the object.
.tooltipped-s::after
  transform: translateX(50%)
```

# themes/cactus/source/css/_util.styl

```styl
/* Basscss */
.inline
  display: inline

.block
  display: block

.inline-block
  display: inline-block

.table
  display: table

.table-cell
  display: table-cell

.overflow-hidden
  overflow: hidden

.overflow-scroll
  overflow: scroll

.overflow-auto
  overflow: auto

.clearfix:before, .clearfix:after
  display: table
  content: " "

.clearfix:after
  clear: both

.left
  float: left

.right
  float: right

.fit
  max-width: 100%

.truncate
  display: inline-block
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.max-width-1
  max-width: 24rem

.max-width-2
  max-width: 32rem

.max-width-3
  max-width: 48rem

.max-width-4
  max-width: 64rem

.border-box
  box-sizing: border-box

.m0
  margin: 0

.mt0
  margin-top: 0

.mr0
  margin-right: 0

.mb0
  margin-bottom: 0

.ml0
  margin-left: 0

.mx0
  margin-right: 0
  margin-left: 0

.my0
  margin-top: 0
  margin-bottom: 0

.m1
  margin: .5rem

.mt1
  margin-top: .5rem

.mr1
  margin-right: .5rem

.mb1
  margin-bottom: .5rem

.ml1
  margin-left: .5rem

.mx1
  margin-right: .5rem
  margin-left: .5rem

.my1
  margin-top: .5rem
  margin-bottom: .5rem

.m2
  margin: 1rem

.mt2
  margin-top: 1rem

.mr2
  margin-right: 1rem

.mb2
  margin-bottom: 1rem

.ml2
  margin-left: 1rem

.mx2
  margin-right: 1rem
  margin-left: 1rem

.my2
  margin-top: 1rem
  margin-bottom: 1rem

.m3
  margin: 2rem

.mt3
  margin-top: 2rem

.mr3
  margin-right: 2rem

.mb3
  margin-bottom: 2rem

.ml3
  margin-left: 2rem

.mx3
  margin-right: 2rem
  margin-left: 2rem

.my3
  margin-top: 2rem
  margin-bottom: 2rem

.m4
  margin: 4rem

.mt4
  margin-top: 4rem

.mr4
  margin-right: 4rem

.mb4
  margin-bottom: 4rem

.ml4
  margin-left: 4rem

.mx4
  margin-right: 4rem
  margin-left: 4rem

.my4
  margin-top: 4rem
  margin-bottom: 4rem

.mxn1
  margin-right: -.5rem
  margin-left: -.5rem

.mxn2
  margin-right: -1rem
  margin-left: -1rem

.mxn3
  margin-right: -2rem
  margin-left: -2rem

.mxn4
  margin-right: -4rem
  margin-left: -4rem

.ml-auto
  margin-left: auto

.mr-auto
  margin-right: auto

.mx-auto
  margin-right: auto
  margin-left: auto

.p0
  padding: 0

.pt0
  padding-top: 0

.pr0
  padding-right: 0

.pb0
  padding-bottom: 0

.pl0
  padding-left: 0

.px0
  padding-right: 0
  padding-left: 0

.py0
  padding-top: 0
  padding-bottom: 0

.p1
  padding: .5rem

.pt1
  padding-top: .5rem

.pr1
  padding-right: .5rem

.pb1
  padding-bottom: .5rem

.pl1
  padding-left: .5rem

.py1
  padding-top: .5rem
  padding-bottom: .5rem

.px1
  padding-right: .5rem
  padding-left: .5rem

.p2
  padding: 1rem

.pt2
  padding-top: 1rem

.pr2
  padding-right: 1rem

.pb2
  padding-bottom: 1rem

.pl2
  padding-left: 1rem

.py2
  padding-top: 1rem
  padding-bottom: 1rem

.px2
  padding-right: 1rem
  padding-left: 1rem

.p3
  padding: 2rem

.pt3
  padding-top: 2rem

.pr3
  padding-right: 2rem

.pb3
  padding-bottom: 2rem

.pl3
  padding-left: 2rem

.py3
  padding-top: 2rem
  padding-bottom: 2rem

.px3
  padding-right: 2rem
  padding-left: 2rem

.p4
  padding: 4rem

.pt4
  padding-top: 4rem

.pr4
  padding-right: 4rem

.pb4
  padding-bottom: 4rem

.pl4
  padding-left: 4rem

.py4
  padding-top: 4rem
  padding-bottom: 4rem

.px4
  padding-right: 4rem
  padding-left: 4rem

```

# themes/cactus/source/css/_variables.styl

```styl
// Fonts
$font-family-heading = "Noto Sans Display", san-serif
$font-family-body = "Atkinson Hyperlegible", serif
$font-family-mono = "Menlo", "Meslo LG", monospace
$font-size = 20px
$line-height = 1.725
$page-width = 0rem + (hexo-config("page_width") || 39)
// Logo
$logo-width = 0px + (hexo-config("logo.width") || 0)
$logo-height = 0px + (hexo-config("logo.height") || 0)
$logo-grayout = hexo-config("logo.grayout") || false
// Colors
$colors = hexo-config("colorscheme") || "dark"

```

# themes/cactus/source/css/style.styl

```styl
@import "_variables"
@import "_colors/" + $colors
@import "_util"
@import "_mixins"
@import "_extend"
@import "_fonts"


global-reset()

*, *:before, *:after
  box-sizing: border-box

/* Scroll bar */
/* For Firefox */
*
  scrollbar-color: $color-scrollbar transparent

/* For Chrome, Edge, and Safari */
*::-webkit-scrollbar
  width: 8px
  height: 6px

*::-webkit-scrollbar-track
  background: transparent

*::-webkit-scrollbar-thumb
  background-color: $color-scrollbar
  border-radius: 6px

*::-webkit-scrollbar-thumb:hover
  background-color: darken($color-scrollbar, 20%)

*::-webkit-scrollbar-thumb:active
  background-color: darken($color-scrollbar, 30%)

html
  margin: 0
  padding: 0
  height: 100%
  border-top: 2px solid $color-text
  -webkit-text-size-adjust: 100%
  -ms-text-size-adjust: 100%

body
  margin: 0
  height: 100%
  background-color: $color-background
  color: $color-text
  font-weight: 400
  font-size: $font-size
  font-family: $font-family-body
  line-height: $line-height
  text-rendering: geometricPrecision

  antialias()

  @extend $base-style

.content
  position: relative
  display: flex
  flex-direction: column
  min-height: 100%
  overflow-wrap: break-word

  p
    hyphens(auto)

  code
    hyphens(manual)

  a
    color: $color-text
    text-decoration: none

    underline(5px, $color-text)

    &:hover
      background-image: linear-gradient(transparent, transparent 4px, $color-link 4px, $color-link)

  a.icon
    background: none

    &:hover
      color: $color-link

  h1 a, .h1 a, h2 a, h3 a, h4 a, h5 a, h6 a
    background: none
    color: inherit
    text-decoration: none
    font-family: $font-family-heading
    font-weight: 400
    font-size: 1.5em

  h1 a:hover, .h1 a:hover, h2 a:hover, h3 a:hover, h4 a:hover, h5 a:hover, h6 a:hover
    underline(6px, $color-link)

  h6
    a
      background: none
      color: inherit
      text-decoration: none

  h6
    a:hover
      underline(6px, $color-link)

@media (min-width: 540px)
  .image-wrap
    flex-direction: row
    margin-bottom: 2rem

    .image-block
      flex: 1 0 35%
      margin-right: 2rem

    p
      flex: 1 0 65%

.max-width
  max-width: $page-width

@media (max-width: 480px)
  // smaller margins at smaller screen widths
  .px3
    padding-right: 1rem
    padding-left: 1rem

  .my4
    margin-top: 2rem
    margin-bottom: 2rem

@media (min-width: 480px)
  p
    text-align: justify

@import "_partial/header"
@import "_partial/index"
@import "_partial/article"
@import "_partial/archive"
@import "_partial/comments"
@import "_partial/footer"
@import "_partial/pagination"
@import "_partial/search"
@import "_partial/tags"
@import "_partial/tooltip"
@import "_partial/categories"
// Code
@import "_highlight/" + $highlight

pre
  overflow-x: auto
  padding: 10px 15px
  padding-bottom: 0
  border: 1px dotted $color-border
  border-radius: 4px
  font-size: 1rem
  font-family: $font-family-mono
  line-height: 22px
  -webkit-border-radius: 4px

  code
    display: block
    padding: 0
    border: none

code
  padding: 0 5px
  border: 1px dotted $color-border
  border-radius: 2px
  -webkit-border-radius: 2px

.highlight
  overflow-x: auto
  margin: 1rem 0
  padding: 10px 15px
  border-radius: 4px
  background: $color-background-code
  font-family: $font-family-mono
  // color: $color-accent-3
  -webkit-border-radius: 4px

  figcaption
    margin: -5px 0 5px
    color: $color-meta-code
    font-size: .9em
    transform: scale(1)

    a
      float: right
      color: $color-meta-code
      font-style: italic
      font-size: .8em

      underline(10px, $color-link)

    a:hover
      color: lighten($color-meta-code, 20%)

    &:before, content: ""
      display: table

    &:after
      clear: both

  &:hover 
    .btn-copy
      opacity: 1

  .btn-copy
    font-size: 1.2rem
    position: absolute
    right: 20px
    opacity: 0
    transition: opacity 0.2s ease-in
    &:hover
      color: $color-accent-1

  pre
    margin: 0
    padding: 0
    border: none
    background: none

  table
    width: auto

  td.gutter
    text-align: right
    opacity: .2

  .line
    height: 22px

#header-post #actions
  direction: ltr !important

```

# themes/cactus/source/images/apple-touch-icon.png

This is a binary file of the type: Image

# themes/cactus/source/images/favicon-192x192.png

This is a binary file of the type: Image

# themes/cactus/source/images/favicon.ico

This is a binary file of the type: Binary

# themes/cactus/source/images/logo.png

This is a binary file of the type: Image

# themes/cactus/source/js/main.js

```js
$(document).ready(function() {
  /**
   * Set up any necessary scroll listeners for smooth scrolling
   * and navigation visibility
   */
  if ($(".post").length) {
    var lastScrollTop = 0;
    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop();
      
      // Show "back to top" button when scrolled down
      if (scrollTop > 300) {
        $("#top-link").fadeIn();
      } else {
        $("#top-link").fadeOut();
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Smooth scroll to top
  $("#top-link").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});
```

# themes/cactus/source/js/search.js

```js
// A local search script with the help of
// [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
//
// Modified by:
// Pieter Robberechts <http://github.com/probberechts>

/*exported searchFunc*/
var searchFunc = function(path, searchId, contentId) {

  function stripHtml(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
    html = html.replace(/<figure([\s\S]*?)<\/figure>/gi, "");
    html = html.replace(/<\/div>/ig, "\n");
    html = html.replace(/<\/li>/ig, "\n");
    html = html.replace(/<li>/ig, "  *  ");
    html = html.replace(/<\/ul>/ig, "\n");
    html = html.replace(/<\/p>/ig, "\n");
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/ig, "");
    return html;
  }

  function getAllCombinations(keywords) {
    var i, j, result = [];

    for (i = 0; i < keywords.length; i++) {
        for (j = i + 1; j < keywords.length + 1; j++) {
            result.push(keywords.slice(i, j).join(" "));
        }
    }
    return result;
  }

  $.ajax({
    url: path,
    dataType: "xml",
    success: function(xmlResponse) {
      // get the contents from search data
      var datas = $("entry", xmlResponse).map(function() {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("link", this).attr("href")
        };
      }).get();

      var $input = document.getElementById(searchId);
      if (!$input) { return; }
      var $resultContent = document.getElementById(contentId);

      $input.addEventListener("input", function(){
        var resultList = [];
        var keywords = getAllCombinations(this.value.trim().toLowerCase().split(" "))
          .sort(function(a,b) { return b.split(" ").length - a.split(" ").length; });
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        // perform local searching
        datas.forEach(function(data) {
          var matches = 0;
          if (!data.title || data.title.trim() === "") {
            data.title = "Untitled";
          }
          var dataTitle = data.title.trim().toLowerCase();
          var dataTitleLowerCase = dataTitle.toLowerCase();
          var dataContent = stripHtml(data.content.trim());
          var dataContentLowerCase = dataContent.toLowerCase();
          var dataUrl = data.url;
          var indexTitle = -1;
          var indexContent = -1;
          var firstOccur = -1;
          // only match artiles with not empty contents
          if (dataContent !== "") {
            keywords.forEach(function(keyword) {
              indexTitle = dataTitleLowerCase.indexOf(keyword);
              indexContent = dataContentLowerCase.indexOf(keyword);

              if( indexTitle >= 0 || indexContent >= 0 ){
                matches += 1;
                if (indexContent < 0) {
                  indexContent = 0;
                }
                if (firstOccur < 0) {
                  firstOccur = indexContent;
                }
              }
            });
          }
          // show search results
          if (matches > 0) {
            var searchResult = {};
            searchResult.rank = matches;
            searchResult.str = "<li><a href='"+ dataUrl +"' class='search-result-title'>"+ dataTitle +"</a>";
            if (firstOccur >= 0) {
              // cut out 100 characters
              var start = firstOccur - 20;
              var end = firstOccur + 80;

              if(start < 0){
                start = 0;
              }

              if(start == 0){
                end = 100;
              }

              if(end > dataContent.length){
                end = dataContent.length;
              }

              var matchContent = dataContent.substring(start, end);

              // highlight all keywords
              var regS = new RegExp(keywords.join("|"), "gi");
              matchContent = matchContent.replace(regS, function(keyword) {
                return "<em class=\"search-keyword\">"+keyword+"</em>";
              });

              searchResult.str += "<p class=\"search-result\">" + matchContent +"...</p>";
            }
            searchResult.str += "</li>";
            resultList.push(searchResult);
          }
        });
        if (resultList.length) {
          resultList.sort(function(a, b) {
              return b.rank - a.rank;
          });
          var result ="<ul class=\"search-result-list\">";
          for (var i = 0; i < resultList.length; i++) {
            result += resultList[i].str;
          }
          result += "</ul>";
          $resultContent.innerHTML = result;
        }
      });
    }
  });
};

```

