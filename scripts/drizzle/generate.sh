#!/bin/bash

export $(grep -v '^#' .env | xargs)
docker run --rm \
  --network "$(basename "$PWD")_default" \
  -v "$(pwd):/app" \
  -w /app \
  "node:$NODE_VERSION-slim" sh -c "npm i --ignore-scripts && npx drizzle-kit generate"
