FROM node:16-alpine

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Exposing PORT to external Environment
# EXPOSE 3001

# This command will run when the container will start
CMD ["npm", "start"]