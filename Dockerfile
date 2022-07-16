FROM node
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma .
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "start" ]