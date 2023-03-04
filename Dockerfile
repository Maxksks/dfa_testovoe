FROM node:18

WORKDIR /var/www/dfgallery

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]