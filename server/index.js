const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// Hardcoded merkle root here representing the whole "nice list"
// A string in here, without the 0x prefix
const MERKLE_ROOT = '65ec8fa38c163c4cb9ba474f46d3281c59317a375fc16ca46ec3232f88d3f77c';

app.post('/gift', (req, res) => {
  
  //Merkle Tree proof from front-end
  const body = req.body;
  proof = body.proof;
  clientName = body.name;
  root = MERKLE_ROOT;

  // // Proving that a name is in the list 
  const isInTheList = verifyProof(proof, clientName, root);
  if(isInTheList) {
    res.send(`${clientName}, you got a toy robot!`);
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
