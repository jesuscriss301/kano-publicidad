# --- 1. compilar la web ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH
RUN npm run build

# --- 2. servidor liviano (sin node_modules) ---
FROM node:20-alpine
WORKDIR /app
ARG BASE_PATH=/
ENV NODE_ENV=production PORT=3000 DATA_DIR=/app/data BASE_PATH=$BASE_PATH
COPY --from=build /app/dist ./dist
COPY server ./server
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3000
VOLUME ["/app/data"]
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server/server.mjs"]
