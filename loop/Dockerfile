# ============================================
# LOOP Platform - Production Dockerfile
# TanStack Start + Node.js
# ============================================

# Stage 1: Dependencies
FROM node:22-slim AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Stage 2: Build
FROM node:22-slim AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production
FROM node:22-slim AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 loop
USER loop

# Copy built application (both server and client assets)
COPY --from=builder --chown=loop:nodejs /app/dist ./dist
COPY --from=builder --chown=loop:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=loop:nodejs /app/package.json ./package.json
COPY --from=builder --chown=loop:nodejs /app/server.mjs ./server.mjs
COPY --from=builder --chown=loop:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=loop:nodejs /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder --chown=loop:nodejs /app/src/lib/db ./src/lib/db
COPY --from=builder --chown=loop:nodejs /app/src/lib/documents.ts ./src/lib/documents.ts
COPY --from=builder --chown=loop:nodejs /app/src/scripts ./src/scripts
COPY --from=builder --chown=loop:nodejs /app/reset-admin.cjs ./reset-admin.cjs

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.mjs"]
