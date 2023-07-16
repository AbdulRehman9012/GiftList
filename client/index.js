const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const { bytesToHex } = require('ethereum-cryptography/utils');
const serverUrl = 'http://localhost:1225';


async function main() {

  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree._getRoot()
  const name = 'Abdul Rehman';
  const index = await niceList.findIndex(n => n === name);
  const proof = await merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    "name":name,
    "proof":proof
  });
  console.log("root: "+bytesToHex(root));
  console.log({ gift });
}

main();