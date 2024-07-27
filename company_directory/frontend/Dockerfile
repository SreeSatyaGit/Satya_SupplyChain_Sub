# Use a node image to build the React app
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json and install dependencies
COPY myapp/package.json /app/
COPY myapp/package-lock.json /app/
RUN npm install

# Copy the rest of the application code
COPY myapp /app/

# Build the application
RUN npm run build

# Use an nginx image to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
