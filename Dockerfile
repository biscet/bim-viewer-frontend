FROM node:16 as react-build

WORKDIR /app
COPY . ./

RUN npm install --legacy-peer-deps

CMD npm run start:serve
