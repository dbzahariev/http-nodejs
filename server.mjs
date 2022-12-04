import { createServer } from 'http';

createServer((req, res) => {
  // res.write('Hello World3!');
  // res.json({ userName: "ramsess" })
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({ userName: "ramsess" })
  res.end();
}).listen(process.env.PORT);
