# Use Node.js 18
FROM node:23-alpine AS builder

# Install Helm and Helm Secrets
RUN apk add --no-cache bash curl && \
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash && \
    helm plugin install https://github.com/jkroepke/helm-secrets

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Decrypt the Helm secrets and generate .env.local
RUN helm secrets dec ./environments/staging.yaml && \
    node scripts/generate-env.js

# Build the application
RUN npm run build

# Use a minimal runtime environment
FROM node:23-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built app and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --only=production

# Expose port and run the app
EXPOSE 8080
ENV PORT 8080
CMD ["npm", "run" , "start"]