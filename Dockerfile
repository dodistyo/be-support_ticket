FROM node:13.8.0-alpine
# Create Directory for the Container
WORKDIR /usr/src/app

# Copy all other source code to work directory
COPY . /usr/src/app
# Install all Packages
RUN npm install
# Start
CMD [ "npm", "run", "prod" ]
EXPOSE 3000
