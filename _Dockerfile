FROM node

RUN mkdir /var/www
WORKDIR /var/www

COPY . /var/www
RUN npm i
ENV NODE_ENV production

EXPOSE 2000
CMD ["npm", "start"]