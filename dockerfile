# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]