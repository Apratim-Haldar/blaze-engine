# Use Node.js base image
FROM node:18-alpine

# Set working directory for buk app
WORKDIR /app

# Copy the buk and blaze-engine directories from the parent context
COPY buk /app
COPY blaze-engine /blaze-engine

# Go to blaze-engine, install dependencies, and create the npm link
RUN cd /blaze-engine && npm install && npm link

# Link blaze-engine in the buk app
RUN npm link blaze-engine

# Install dependencies for buk app
RUN npm install

# Expose the port that buk is running on
EXPOSE 3000

# Start the buk app
CMD ["npm", "start"]
