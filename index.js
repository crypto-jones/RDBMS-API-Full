const express = require('express');
const helmet = require('helmet');

// TODO: IMPORT ROUTES

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('API SANITY CHECK');
});

// TODO: server.use('ROUTES')

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\n=== API listening on http://localhost:${PORT} ===\n`)
);
