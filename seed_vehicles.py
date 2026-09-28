#!/usr/bin/env python
"""
Standalone seed script to populate database with diverse vehicles.
Usage:
    python seed_vehicles.py
    python seed_vehicles.py --clear
"""
import os
import sys
import django

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.core.management import call_command

if __name__ == "__main__":
    clear = "--clear" in sys.argv
    print(f"Running vehicle seeder (clear={clear})...")
    call_command("seed_vehicles", clear=clear)
