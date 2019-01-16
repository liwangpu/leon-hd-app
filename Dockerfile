FROM node:8.15.0-alpine
# ENV SECRETKEY damaozhu-morejee-app
# ENV APISERVER http://testapi.damaozhu.com.cn
# ENV TOOLSERVER http://testtool.damaozhu.com.cn
WORKDIR /app
COPY dist/. dist/.
EXPOSE 4000
CMD [ "node" ,"dist/browser/assets/app-startup.js"]
