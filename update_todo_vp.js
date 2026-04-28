const { Client } = require('pg');
const id = process.argv[2];
const status = process.argv[3] || 'done';
const client = new Client({
  host: 'x0k4w8404wckwwcswg808gco',
  database: 'projects',
  user: 'postgres',
  password: 'WFBGCo6cjCf7NbxVfkPSe5x0P41v3d27MowubhpPmfk9CgrfcMhBUvp8lyCfjobL'
});
client.connect();
client.query(`UPDATE todo SET status=$1, updated_at=NOW() WHERE id=$2::integer RETURNING id, status, task;`, [status, id], (err, res) => {
  if (err) console.error(err);
  else console.log(JSON.stringify(res.rows));
  client.end();
});
