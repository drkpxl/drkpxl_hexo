---
title: Easiest way to run Wallabag on Digital Ocean
date: 2025-05-05 18:23:38
description: "Yhis guide walks you through setting up Wallabag using Docker Compose on a new server. The goal is to get it running first try, no surprises,"
tags:
  - home automation
  - self hosting

categories:
  - code
  - self hosting
---

# 🧾 How to Install Wallabag with Docker (The Easy Way)

**Wallabag** is a self-hosted read-it-later app — like Pocket, but open source. This guide walks you through setting up Wallabag using Docker Compose on a new server (such as a DigitalOcean droplet or any Ubuntu machine). The goal: **get it running first try, no surprises**.

---

## ✅ What You Need

- A Linux server (Ubuntu 22.04 recommended)
- Docker and Docker Compose installed
- Basic terminal access (`ssh`)
- Your server's IP address

---

## 🏗️ Step 1: Create a Project Directory

```bash
mkdir wallabag && cd wallabag
```

---

## 📄 Step 2: Create `docker-compose.yaml`

Create a new file called `docker-compose.yaml` and paste this:

```yaml
services:
  wallabag:
    image: wallabag/wallabag
    container_name: wallabag
    env_file:
      - ./configuration_wallabag.env
    ports:
      - "8812:80" # Change 8812 to a free port if needed
    volumes:
      - wallabag-images:/var/www/wallabag/web/assets/images
    depends_on:
      - wallabag_db
      - wallabag_cache

  wallabag_db:
    image: postgres:14
    container_name: wallabag_db
    env_file:
      - ./configuration_wallabag.env
    ports:
      - "5434:5432"
    volumes:
      - wallabag-db:/var/lib/postgresql/data

  wallabag_cache:
    image: redis:alpine
    container_name: wallabag_cache

volumes:
  wallabag-images:
  wallabag-db:
```

---

## 🔐 Step 3: Create `configuration_wallabag.env`

In the same folder, create a file named `configuration_wallabag.env` with the following content:

```env
# PostgreSQL database settings
POSTGRES_USER=wallabag
POSTGRES_PASSWORD=changeme
POSTGRES_DB=wallabag

# Wallabag Symfony configuration
SYMFONY__ENV__DATABASE_DRIVER=pdo_pgsql
SYMFONY__ENV__DATABASE_HOST=wallabag_db
SYMFONY__ENV__DATABASE_PORT=5432
SYMFONY__ENV__DATABASE_NAME=wallabag
SYMFONY__ENV__DATABASE_USER=wallabag
SYMFONY__ENV__DATABASE_PASSWORD=changeme
SYMFONY__ENV__DOMAIN_NAME=https://yourdomain.com
SYMFONY__ENV__SERVER_NAME=WallabagServer
SYMFONY__ENV__FOSUSER_REGISTRATION=false
SYMFONY__ENV__FOSUSER_CONFIRMATION=false
```

> 🔒 Replace `changeme` with a secure password.  
> 🌐 Replace `your-server-ip` with your actual https domain name. I use cloudflared here to make it easy.

---

## 🚀 Step 4: Launch the Stack

```bash
docker-compose up -d
```

Docker will pull the required images, set up volumes, and launch the services.

---

## 🛠️ Step 5: Initialize Wallabag

Now run the Wallabag installer to set up the database and create your admin account.

```bash
docker exec -it wallabag sh
php bin/console wallabag:install --env=prod
```

You’ll be asked to confirm settings (they’ll pre-fill based on your `.env` file), and then enter:

- Admin username
- Admin email
- Admin password

When it's done, exit the container:

```bash
exit
```

---

## 🌐 Step 6: Access Wallabag

In your browser, go to:

```
https://yourdomain.com
```

You’ll see the login screen. Use the credentials you just created.

🎉 You now have a fully working Wallabag instance!

---

## 📦 Optional: Backup Volumes

To back up your data:

```bash
docker run --rm -v wallabag-db:/volume -v $(pwd):/backup alpine \
  tar czf /backup/wallabag-db-backup.tar.gz -C /volume ./

docker run --rm -v wallabag-images:/volume -v $(pwd):/backup alpine \
  tar czf /backup/wallabag-images-backup.tar.gz -C /volume ./
```

---

## ✅ Summary

| Task             | Command                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| Start Wallabag   | `docker-compose up -d`                                                       |
| Access app       | `https://yourdomain.com`                                                     |
| Run installer    | `docker exec -it wallabag sh && php bin/console wallabag:install --env=prod` |
| Restart Wallabag | `docker restart wallabag`                                                    |

---

## 🔒 Next Steps (Optional)

- Set up Cloudflared
- Use Docker volumes for automated remote backups
- Set up Wallabag mobile or browser extensions
