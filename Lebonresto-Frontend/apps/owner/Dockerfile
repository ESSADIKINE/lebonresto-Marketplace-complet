FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY apps ./apps
RUN npm ci
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Run build directly from app directory to avoid npm workspace CLI issues
WORKDIR /app/apps/owner
RUN ../../node_modules/.bin/next build

FROM node:20-alpine AS runner
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NODE_ENV production

# Copy root node_modules and package.json
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy app artifacts
WORKDIR /app/apps/owner
COPY --from=builder /app/apps/owner/next.config.js ./
COPY --from=builder /app/apps/owner/public ./public
COPY --from=builder /app/apps/owner/.next ./.next
COPY --from=builder /app/apps/owner/package.json ./

EXPOSE 4003
CMD ["npm", "start"]
