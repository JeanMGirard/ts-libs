#!/usr/bin/env bash


# Only directories
find . -type d -print | grep -v "node_modules" | grep -v ".git" | grep -v "old"

# All
find .  -print | grep -v "node_modules" | grep -v ".git" | grep -v "old"
