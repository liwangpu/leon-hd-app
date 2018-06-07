// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    //测试专用
    moc: "test",

    production: false,
    hmr: false,
    serveBase: 'http://localhost:1882',
    shareServerBase: 'http://192.168.1.3:82/share-resource',
    loginStyle: 2,
    isMaintaining: false,
    maintainingEndDate: '',
    language: 'cn',
    dialogMin: {
        width: '450px',
        height: '600px'
    },
    dialogMed: {
        width: '600px',
        height: '750px'
    }
};
