const fs = require('fs');
const exec = require('child_process').exec;

const appConfigPath = '/app/dist/browser/assets/app-config.json';

var appConfig = {
    server: process.env.APISERVER
    , toolServer: process.env.TOOLSERVER
    , secretKey: process.env.SECRETKEY
    , omsOrder2ExcelToolServer: process.env.OMSORDER2EXCELTOOLSERVER
};
fs.writeFile(appConfigPath, JSON.stringify(appConfig), function (err) {
    if (err) {
        console.error('app config error:', err);
        return;
    }
    console.log('app config ready!');

    exec('node /app/dist/server.js', function (error, stdOut, stdErr) {
        if (error) {
            console.error(error);
            return;
        }
    });
});
