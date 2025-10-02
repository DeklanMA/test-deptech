# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --platform=linux --force

# Copy semua source code
COPY . .

# Copy env.example -> .env.local
RUN cp .env.example .env.local

# Build Next.js
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app

# Copy hasil build dan node_modules dari builder
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
