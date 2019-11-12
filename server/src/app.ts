
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();




app.get('/api/test', (req: object, res: {end:Function}) => {
  console.log(typeof req, typeof res)
  res.end();
})





let myTest = (val1: number) => {
  return val1 + 2;
}

console.log(myTest(1));


app.listen(port, ()=> console.log('listening to port: ', port))

// export default {
//   myTest
// }


