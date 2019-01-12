const fs = require('fs');
const exec = require('child_process').exec;

const appConfigPath = 'assets/app-config.json';

var appConfig = {
    server: process.env.APISERVER
    , toolServer: process.env.TOOLSERVER
};
fs.writeFile(appConfigPath, JSON.stringify(appConfig), function (err) {
    if (err) {
        console.error('app config error:', err);
        return;
    }
    console.log('app config done!');
    exec('http-server', function (error, stdOut, stdErr) {
        if (error) {
            console.error(error);
            return;
        }
    });
});
