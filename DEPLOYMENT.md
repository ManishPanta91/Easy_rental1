# Deployment Guide: Python 3.8 + Django 4.2 LTS + Gunicorn + Nginx

This guide walks you through setting up and deploying the **VehicleRental Backend API** on a Linux server (such as Ubuntu 20.04 LTS / 22.04 LTS or Debian) running **Python 3.8**.

---

## Architecture Overview

```text
Client (Web / Mobile)
        │
        ▼ HTTP (Port 80 / 443 HTTPS)
   ┌─────────┐
   │  Nginx  │  ──► Serves Static Files (`/static/`) directly from `staticfiles/`
   └────┬────┘  ──► Serves Media Files (`/media/`) directly from `media/`
        │ (Reverse Proxy)
        ▼ HTTP (127.0.0.1:8000 or UNIX Socket)
   ┌───────────┐
   │ Gunicorn  │  (Managed by systemd service)
   └─────┬─────┘
         │ (WSGI: core.wsgi:application)
         ▼
   ┌───────────┐
   │ Django 4.2│  (Runs on Python 3.8 with DRF 3.14)
   └───────────┘
```

---

## 1. Server System Prerequisites

Update system packages and install Python 3.8, build dependencies (required for Pillow / C extensions), and Nginx:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3.8 python3.8-venv python3.8-dev \
                    build-essential libpq-dev libjpeg-dev zlib1g-dev \
                    nginx git curl
```

*(Note: On Ubuntu 20.04, Python 3.8 is the default system Python. On Ubuntu 22.04 or newer, if Python 3.8 is not in default repos, add `sudo add-apt-repository ppa:deadsnakes/ppa && sudo apt update`).*

---

## 2. Project Directory & Virtual Environment Setup

Create project directory and set proper ownership:

```bash
# Create application directory
sudo mkdir -p /var/www/vehicle_rental
sudo chown -R $USER:www-data /var/www/vehicle_rental

# Clone or copy your project repository
cd /var/www/vehicle_rental
git clone <your-repo-url> backend
cd /var/www/vehicle_rental/backend

# Create virtual environment using Python 3.8 explicitly
python3.8 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip, setuptools, and wheel
pip install --upgrade pip setuptools wheel

# Install Python 3.8 & Django 4.2 compatible dependencies
pip install -r requirements.txt
```

---

## 3. Environment Configuration

Create your `.env` file from the example:

```bash
cp .env.example .env
nano .env
```

Set appropriate production values:
- `DEBUG=False`
- `SECRET_KEY=<generate a strong secret key>`
- `ALLOWED_HOSTS=your_server_ip,yourdomain.com`
- Configure `ESEWA_*` credentials as needed

---

## 4. Database Migrations & Static Files Collection

Run migrations, create a superuser, and collect static assets for Nginx:

```bash
# Apply database migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Collect static files into the STATIC_ROOT directory (/staticfiles/)
python manage.py collectstatic --noinput

# Ensure upload media directory exists and has proper permissions
mkdir -p media
sudo chown -R $USER:www-data media staticfiles db.sqlite3
sudo chmod -R 775 media staticfiles
```

---

## 5. Configure Gunicorn Systemd Service

Copy the systemd service file into `/etc/systemd/system/`:

```bash
sudo cp vehicle_rental.service /etc/systemd/system/vehicle_rental.service
```

*(Edit `/etc/systemd/system/vehicle_rental.service` if your paths, user, or environment file differ).*

Reload systemd daemon, start Gunicorn, and enable it on boot:

```bash
sudo systemctl daemon-reload
sudo systemctl start vehicle_rental
sudo systemctl enable vehicle_rental

# Verify Gunicorn status
sudo systemctl status vehicle_rental
```

To view live Gunicorn logs:
```bash
sudo journalctl -u vehicle_rental -f
```

---

## 6. Configure Nginx

Copy the Nginx configuration to `sites-available`:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/vehicle_rental
```

Edit `/etc/nginx/sites-available/vehicle_rental` to replace `your_domain.com` with your actual domain name or server IP:

```bash
sudo nano /etc/nginx/sites-available/vehicle_rental
```

Enable the site and remove default site if present:

```bash
# Enable the vehicle_rental site
sudo ln -s /etc/nginx/sites-available/vehicle_rental /etc/nginx/sites-enabled/

# Optional: remove default Nginx welcome page
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 7. Setup SSL / HTTPS (Let's Encrypt / Certbot)

For production HTTPS, install Certbot and run:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically modify your Nginx configuration to enable HTTPS and renew certificates via systemd timer.

---

## 8. Summary of Maintenance Commands

| Task | Command |
|---|---|
| Restart Gunicorn after code updates | `sudo systemctl restart vehicle_rental` |
| View Gunicorn service status | `sudo systemctl status vehicle_rental` |
| View Gunicorn live logs | `sudo journalctl -u vehicle_rental -f` |
| Test Nginx config | `sudo nginx -t` |
| Restart Nginx | `sudo systemctl restart nginx` |
| View Nginx error logs | `sudo tail -f /var/log/nginx/vehicle_rental_error.log` |
