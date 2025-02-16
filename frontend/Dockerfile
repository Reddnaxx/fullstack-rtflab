# Dependencies
FROM node:22.13.1-alpine AS deps
WORKDIR /app
COPY package*.json ./

RUN npm ci

# Build
FROM node:22.13.1-alpine AS build
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# Serve
FROM node:22.13.1-alpine AS serve
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]