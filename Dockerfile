FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "dev"]
