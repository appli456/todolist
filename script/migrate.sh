#!/usr/bin/env bash
cd ..
./manage.py makemigrations todolist
./manage.py migrate