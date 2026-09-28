"""
Gunicorn configuration for VehicleRental Django API.
Python 3.8 & Django 4.2 LTS compatible.
"""

import multiprocessing
import os

# Server socket
# Can use a UNIX socket (recommended for production behind Nginx on the same host)
# or TCP socket like '127.0.0.1:8000'
bind = os.environ.get("GUNICORN_BIND", "127.0.0.1:8000")
backlog = 2048

# Worker Processes
# Standard formula: (2 * number of CPU cores) + 1
workers = int(os.environ.get("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1))
worker_class = "sync"
worker_connections = 1000
timeout = 60
keepalive = 2

# Process naming
proc_name = "vehicle_rental_api"

# Logging
accesslog = os.environ.get("GUNICORN_ACCESS_LOG", "-")  # '-' means stdout
errorlog = os.environ.get("GUNICORN_ERROR_LOG", "-")    # '-' means stderr
loglevel = os.environ.get("GUNICORN_LOG_LEVEL", "info")

# Daemon mode (Keep False when running under systemd or Docker)
daemon = False
