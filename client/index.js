const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  //Prove to the server the name is in the list

  //Import names to the Merkle tree and get the root hash(HEX)
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();

  // Retrieve the proof that the name block is in the list 
const name = 'Payam Beigi';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift` ,{
    clientProof: proof,
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log({ gift });
}

main();