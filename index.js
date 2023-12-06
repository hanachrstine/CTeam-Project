const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
    },
  });

  await server.register(require('@hapi/inert'));

  server.route(require('./routes/routes'));

  await server.start();
  console.log('Server berjalan di', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
