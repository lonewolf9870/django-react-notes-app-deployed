#!/bin/sh

echo "Waiting for database..."

python manage.py migrate --noinput

python manage.py collectstatic --noinput

echo "Starting Gunicorn..."

exec gunicorn notesapp.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 3