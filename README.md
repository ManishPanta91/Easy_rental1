# Django Project

A Django-based web application/API.

## Prerequisites

Make sure you have the following installed:

* Python 3.10+
* Git
* pip
* Virtual environment support

Check your installations:

```bash
python --version
git --version
pip --version
```

---

# 1. Clone the Project

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd <project-name>
```

For example:

```bash
git clone https://github.com/username/my-django-project.git
cd my-django-project
```

---

# 2. Create a Virtual Environment

It is recommended to use a virtual environment so that project dependencies do not interfere with your system Python packages.

### Windows

```bash
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

If you are using Command Prompt:

```cmd
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

After activation, you should see something similar to:

```text
(venv) C:\project>
```

---

# 3. Upgrade pip

After activating the virtual environment:

```bash
python -m pip install --upgrade pip
```

---

# 4. Install Project Dependencies

The project dependencies are listed in `requirements.txt`.

Install them with:

```bash
pip install -r requirements.txt
```

This installs all Python packages required by the project.

You can verify the installed packages with:

```bash
pip list
```

---

# 5. Environment Variables

Do **not** commit secrets such as passwords, API keys, database credentials, or Django's `SECRET_KEY` to Git.

Create a `.env` file in the project root if the project uses environment variables.

Example:

```env
DEBUG=True
SECRET_KEY=your-secret-key

DATABASE_NAME=database_name
DATABASE_USER=database_user
DATABASE_PASSWORD=database_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

The exact variables required depend on the project's `settings.py`.

> Check `settings.py`, `.env.example`, or the project documentation for the required environment variables.

If an `.env.example` file exists, copy it:

### Windows

```powershell
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Then update `.env` with your local configuration.

---

# 6. Apply Database Migrations

Before running the application, apply the database migrations:

```bash
python manage.py migrate
```

This creates and updates the database tables required by Django and the installed applications.

To see the migration status:

```bash
python manage.py showmigrations
```

---

# 7. Create a Superuser

If the project uses Django Admin, create an administrator account:

```bash
python manage.py createsuperuser
```

Django will ask for information such as:

```text
Username:
Email address:
Password:
Password (again):
```

If the project uses a custom user model with email authentication, the prompts may be different.

---

# 8. Collect Static Files

For development, Django can serve static files automatically when `DEBUG=True`.

For production, collect static files with:

```bash
python manage.py collectstatic
```

You may be asked:

```text
You have requested to collect static files at the destination
location as specified in your settings.
```

Confirm with:

```text
yes
```

Only run this when the project is configured for it.

---

# 9. Create Media Directory

If the application supports file/image uploads, make sure the media directory exists.

For example:

```text
project/
├── media/
├── static/
├── manage.py
└── ...
```

The exact location depends on the project's `MEDIA_ROOT` configuration.

---

# 10. Run the Development Server

Start Django's development server:

```bash
python manage.py runserver
```

You should see something similar to:

```text
Starting development server at http://127.0.0.1:8000/
```

Open:

```text
http://127.0.0.1:8000/
```

in your browser.

To make the server accessible from other devices on your local network:

```bash
python manage.py runserver 0.0.0.0:8000
```

You may also need to add the appropriate host to `ALLOWED_HOSTS`.

---

# 11. Django Admin

If Django Admin is enabled, open:

```text
http://127.0.0.1:8000/admin/
```

Log in using the superuser account created earlier.

---

# 12. Running Tests

Run the project's tests with:

```bash
python manage.py test
```

For a specific application:

```bash
python manage.py test <app_name>
```

Example:

```bash
python manage.py test users
```

---

# 13. Checking the Project

Django provides a system check command:

```bash
python manage.py check
```

For deployment checks:

```bash
python manage.py check --deploy
```

The deployment check can identify configuration issues that should be addressed before deploying to production.

---

# 14. Making Model Changes

If you modify Django models, create migrations:

```bash
python manage.py makemigrations
```

Then apply them:

```bash
python manage.py migrate
```

The usual workflow is:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

# 15. Useful Django Commands

### Start the server

```bash
python manage.py runserver
```

### Create migrations

```bash
python manage.py makemigrations
```

### Apply migrations

```bash
python manage.py migrate
```

### Create superuser

```bash
python manage.py createsuperuser
```

### Open Django shell

```bash
python manage.py shell
```

### Run tests

```bash
python manage.py test
```

### Check configuration

```bash
python manage.py check
```

### Collect static files

```bash
python manage.py collectstatic
```

### List migrations

```bash
python manage.py showmigrations
```

---

# 16. Project Structure

A typical Django project may look like:

```text
project/
│
├── manage.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
│
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── users/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── media/
└── static/
```

The actual structure may differ depending on the project.

---

# 17. If Using Django REST Framework

If this is a Django REST Framework project, the API will usually be available under a route such as:

```text
http://127.0.0.1:8000/api/
```

The exact API URL depends on the project's `urls.py`.

For example:

```text
/api/users/
/api/products/
/api/orders/
```

If Swagger/OpenAPI documentation is configured, it may be available at something like:

```text
/api/docs/
```

or:

```text
/swagger/
```

Check the project's URL configuration for the exact endpoint.

---

# 18. If Using JWT Authentication

If the project uses JWT authentication, you may have endpoints similar to:

```text
POST /api/token/
POST /api/token/refresh/
```

A typical login request might look like:

```json
{
    "email": "user@example.com",
    "password": "your-password"
}
```

The response may contain:

```json
{
    "access": "...",
    "refresh": "..."
}
```

Use the access token when making authenticated API requests:

```http
Authorization: Bearer <access-token>
```

The exact endpoints and request fields depend on the project's authentication implementation.

---

# 19. Deactivating the Virtual Environment

When you are finished working:

```bash
deactivate
```

To work on the project again, activate the environment:

### Windows

```powershell
.\venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

# 20. Updating Dependencies

If `requirements.txt` has changed, update your installed packages:

```bash
pip install -r requirements.txt
```

To generate a new `requirements.txt` from the current environment:

```bash
pip freeze > requirements.txt
```

Be careful when using `pip freeze` because it records every installed package in the active virtual environment.

---

# 21. Common Problems

## `python` is not recognized

On some systems, try:

```bash
python3 --version
```

If Python is not installed, install Python and make sure it is added to your system `PATH`.

---

## `pip` is not recognized

Use:

```bash
python -m pip --version
```

Instead of:

```bash
pip --version
```

You can also install dependencies with:

```bash
python -m pip install -r requirements.txt
```

---

## Virtual environment activation fails on Windows

If PowerShell blocks script execution, you may need to adjust the execution policy for your user account:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## `No module named django`

Make sure the virtual environment is activated:

```powershell
.\venv\Scripts\Activate.ps1
```

Then install dependencies:

```bash
python -m pip install -r requirements.txt
```

Verify Django:

```bash
python -m django --version
```

---

## Database errors

First make sure your database server is running and your `.env` configuration is correct.

Then run:

```bash
python manage.py migrate
```

Check:

* Database name
* Database username
* Database password
* Database host
* Database port
* Database server status

---

## Migration errors

Check migration status:

```bash
python manage.py showmigrations
```

Then try:

```bash
python manage.py makemigrations
python manage.py migrate
```

Avoid deleting migration files or the database unless you understand the consequences, particularly when working with existing data.

---

# 22. Git Workflow

Before making changes:

```bash
git pull
```

Check the current status:

```bash
git status
```

Create a new branch:

```bash
git checkout -b feature/my-feature
```

After making changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add my feature"
```

Push:

```bash
git push origin feature/my-feature
```

---

# 23. Important Security Notes

Never commit the following to Git:

```text
.env
*.sqlite3
__pycache__/
*.pyc
secret keys
database passwords
API keys
private credentials
```

Make sure `.gitignore` is configured correctly.

For production:

* Set `DEBUG=False`
* Use a strong `SECRET_KEY`
* Configure `ALLOWED_HOSTS`
* Use HTTPS
* Configure secure cookies
* Configure CSRF settings
* Configure CORS carefully
* Use a production database
* Run `python manage.py check --deploy`
* Use a production WSGI/ASGI server
* Configure static and media file serving properly

---

# 24. Complete Setup — Quick Version

For most Django projects, the complete setup is:

```bash
# Clone
git clone <repository-url>

# Enter project
cd <project-name>

# Create virtual environment
python -m venv venv

# Activate - Windows PowerShell
.\venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
python -m pip install -r requirements.txt

# Configure environment variables
# Create/update .env

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Then open:

```text
http://127.0.0.1:8000/
```

---

# 25. Development Workflow

After the initial setup, the normal development workflow is:

```bash
# Activate virtual environment

# Pull latest changes
git pull

# Install any new dependencies
python -m pip install -r requirements.txt

# Apply new migrations
python manage.py migrate

# Run tests
python manage.py test

# Start server
python manage.py runserver
```

When changing models:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## License

Add the project's license information here.

## Contributors

Add project contributors here.

## Contact

Add project maintainer/contact information here.
