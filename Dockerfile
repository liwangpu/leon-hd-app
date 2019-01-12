FROM node:8.15.0-alpine
EXPOSE 8080
ENV APISERVER http://testapi.damaozhu.com.cn
ENV TOOLSERVER http://testtool.damaozhu.com.cn
WORKDIR /src
COPY dist/browser .
RUN npm i -g http-server
CMD ["node","assets/app-startup.js"]

