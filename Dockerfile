FROM node:20

WORKDIR /home/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3003

CMD ["npm", "run", "dev"]
