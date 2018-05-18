// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    hmr: false,
    serveBase: 'http://localhost:1882',
    loginStyle: 2,
    isMaintaining: false,
    maintainingEndDate: '',
    language: 'en',
    dialogMin: {
        width: '450px',
        height: '600px'
    },
    dialogMed: {
        width: '600px',
        height: '750px'
    }
};
