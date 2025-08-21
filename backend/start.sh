#!/bin/bash
echo "Starting Portfolio Backend Server..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload