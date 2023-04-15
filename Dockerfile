# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /frontapi

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build --prod

# Expose the port used by the application
EXPOSE 80

# Start the application
CMD [ "npm", "run", "start" ]