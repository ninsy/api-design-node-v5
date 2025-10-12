ARG NODE_VERSION

FROM node:${NODE_VERSION} as base

WORKDIR /app
COPY --chown=node:node package*.json .
RUN chown -R node /app && chmod -R u+rwx /app

USER node
RUN npm i

CMD ["npm", "run", "dev"]