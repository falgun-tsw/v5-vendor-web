FROM node:16.20.0-alpine
WORKDIR /app
COPY package.json .
Copy package-lock.json .
#COPY packages/v5_global_screen_builder/package.json ./packages/v5_global_screen_builder/
RUN npm install -f
RUN npm install recompose -f
COPY .  .
CMD ["npm", "start"]
