const express = require('express');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;
const server = express();
const cohortRoutes = require('./routes/cohortRoutes');

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortRoutes);

server.get('/', (req, res) => {
  res.send('API SANITY CHECK');
});

server.listen(PORT, () =>
  console.log(`\n=== API listening on http://localhost:${PORT} ===\n`)
);
