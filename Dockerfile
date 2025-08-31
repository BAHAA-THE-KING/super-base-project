# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:stable-alpine

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Replace default nginx config with our custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 instead of 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
