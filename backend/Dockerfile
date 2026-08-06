FROM node:24-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY backend/package.json backend/tsconfig.json ./backend/
RUN corepack enable && pnpm install --frozen-lockfile
COPY backend/src ./backend/src
RUN pnpm --filter @b-tamp/backend build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN corepack enable && pnpm install --filter @b-tamp/backend --prod --frozen-lockfile
COPY --from=build /app/backend/dist ./backend/dist
RUN mkdir -p /app/data
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:4000/api/v1/health || exit 1
CMD ["node", "backend/dist/server.js"]
