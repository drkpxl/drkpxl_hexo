---
title: "Tracking Ikon Pass Resort Opening Dates"
slug: "scraping-opening-days-for-ikon-pass"
date: "2024-11-22"
lastmod: "2024-11-22"
tags: [ai, hacks, nodes, projects, apps]
description: "Built an automated tracking system using NodeJS and AI to monitor ski resort opening dates, featuring web scraping, data processing, and real-time notifications."
---

![Screenshot 2024-11-01 at 10](/images/02-am.webp)

At Ikon Pass we have always found it frustrating to track resort opening dates. These dates often shift due to weather conditions, and resorts tend to make last-minute decisions based on always changing weather that can be easy to miss. To solve this problem, I built an automated tracking system that keeps Ikon Pass employees and pass holders informed of the latest opening dates and pushes that information to both a webpage and a Slack web hook so employees can know right when it goes up.

## The Vision

I wanted to create a tool that would:

- Automatically scrape all Ikon Pass resort websites for opening dates
- Use AI to standardize the varied ways resorts announce their opening dates
- Present the information in a clear, user-friendly format on web and in Slack
- Alert users when dates change or opening day approaches

You can check out the live site here: [Ikon Pass Opening Dates](https://opening.drkpxl.com)

## Technical Stack

The project combines tried-and-true technologies with some cutting-edge tools:

- **NodeJS** for the backend infrastructure
- **Puppeteer** for web scraping
- **Anthropic's Claude AI** for natural language processing
- **Docker and Docker Compose** for containerization
- **Digital Ocean** for hosting

## Key Learnings

Two major insights emerged during development:

1. **Resource Requirements:** Web scraping with headless browsers is CPU-intensive. What seems like a simple task actually requires substantial computing power to run efficiently.

2. **AI Fine-Tuning:** While AI APIs are powerful, they need careful prompt engineering to produce consistent results. Getting standardized date formats and reliable information extraction required several iterations of refinement.

## Technical Details

The system works by:

1. Scanning resort homepages for keywords like "opening" and potential date patterns
2. Storing the scraped information in JSON format
3. Processing the raw text through Claude to standardize the date formats and language
4. Displaying the processed information with visual indicators for changed dates and upcoming openings

![Screenshot 2024-11-01 at 10](/images/22-am.webp)

## Want to Know More?

I'm happy to share more details about the project's architecture or implementation. You can find me on [Threads](https://www.threads.net/@stevendrkpxl) where I regularly discuss tech projects and development insights.
