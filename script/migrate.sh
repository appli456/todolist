#!/usr/bin/env bash
cd ..
./manage.py makemigrations app_todolist
./manage.py migrate