FROM node:latest

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY backend /usr/src/backend/
RUN npm install

# CMD [ "node", "app.js" ]