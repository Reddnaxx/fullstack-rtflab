#!/bin/bash
docker compose build api && \
docker compose up api -d && \
docker compose build client