# Stage 1: Build
FROM docker.io/node:22-alpine AS builder
WORKDIR /opt/app-root/src

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Install dependencies (including devDependencies)
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN yarn build

# Stage 2: Build a runtime image
FROM docker.io/nginxinc/nginx-unprivileged:alpine
ENV NODE_ENV=production

COPY --from=builder /opt/app-root/src/build/ /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]