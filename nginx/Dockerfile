# ---------- Stage 1 ----------
FROM node:22-alpine AS frontend-builder

WORKDIR /app

COPY notesfrontend/package*.json ./

RUN npm install

COPY notesfrontend/ .

RUN npm run build

# ---------- Stage 2 ----------
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=frontend-builder /app/dist /usr/share/nginx/html