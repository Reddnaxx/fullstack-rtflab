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

RUN npx prisma generate
RUN npm run build

# Serve
FROM node:22.13.1-alpine AS serve
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

EXPOSE 8000
ENTRYPOINT [ "npm", "run", "migrate:start:prod" ]