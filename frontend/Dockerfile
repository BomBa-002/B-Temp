FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY frontend/package.json frontend/tsconfig.json ./frontend/
RUN corepack enable && pnpm install --frozen-lockfile
COPY frontend/index.html frontend/vite.config.ts frontend/tailwind.config.ts frontend/postcss.config.js ./frontend/
COPY frontend/src ./frontend/src
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm --filter @b-tamp/frontend build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
