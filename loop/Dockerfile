# ============================================
# LOOP Platform - Production Dockerfile
# TanStack Start + Node.js
# ============================================

# Stage 1: Dependencies
FROM node:20-slim AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Stage 2: Build
FROM node:20-slim AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN pnpm build

# Stage 3: Production
FROM node:20-slim AS runner
WORKDIR /app

# Install pnpm for running scripts if needed
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 loop
USER loop

# Copy built application
COPY --from=builder --chown=loop:nodejs /app/dist ./dist
COPY --from=builder --chown=loop:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=loop:nodejs /app/package.json ./package.json
COPY --from=builder --chown=loop:nodejs /app/server.mjs ./server.mjs

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.mjs"]
