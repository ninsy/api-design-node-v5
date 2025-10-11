FROM node:24 as BASE

WORKDIR /app
COPY --chown=node:node package*.json .
RUN chown -R node /app && chmod -R u+rwx /app

USER node
RUN npm i

CMD ["npm", "run", "dev"]