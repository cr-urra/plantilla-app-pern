import app from './app';

//starting del server

async function main() {
    await app.listen(app.get('port'), () => {
        console.log('server on port', app.get('port'));
    });
}

main();