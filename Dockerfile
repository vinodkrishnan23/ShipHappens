# Use Node.js 18
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

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
CMD ["npm", "run" , "start", "--", "-p", "8080", "-H", "0.0.0.0"]