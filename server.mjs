import { createServer } from 'http';

createServer((req, res) => {
  // res.write('Hello World3!');
  // res.json({ userName: "ramsess" })
  // res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ userName: "ramsess" }))
  res.end();
}).listen(process.env.PORT);

