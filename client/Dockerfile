# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci


COPY . .
RUN npm run build


FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s CMD wget --no-verbose --spider http://localhost/ || exit 1

EXPOSE 80

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
