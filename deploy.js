const ethers = require("ethers"); // always add packages/dependencies at the very top
const fs = require("fs-extra");

async function main() {
  // console.log("hi");
  // let variable = 5;
  // console.log(variable);
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545" //were connecting to this url from ganache
  );
  const wallet = new ethers.Wallet(
    "6d6ead84ee3d61a22166c4f2f420fe35bc8c9e5172e15c98519dc866c8ffbf11",
    provider
  ); // never post your actual pvt key into your code. this is a dev setup so its okay. the wallet function also needs params like private key and a provider.
  // To deploy our code we need our ABI and the binary compiled code
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); // add path to abi function
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  ); // add path to binary function
  // now we need a contract factory.. this is what we use to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // we pass the abi so our code knows how to interact with the contract. the binary because its the main compiled code in our wallet so that we have a private key we can use to sign deploying this contract!
  console.log("Deploying, please wait... ");
  const contract =
    await contractFactory.deploy(/* you can add overrides into the function.. example: {
    gasPrice: 1000000000000,
  }*/); // you can only use the await keyword inside a async function. we are telling our code to stop and wait for the contract to deploy. the await returns a contract object. now i can log the contract to the console.
  const transactionReceipt = await contract.deployTransaction.wait(1); // we can specify how many confirmations we would like to have before moving on
  // console.log("here is the deployment transaction");
  // console.log(contract.deployTransaction);
  // console.log("here is the transaction receipt");
  // console.log(transactionReceipt);
  // now we can see that the ganache wallet we used has a little less eth inside because the contract deployed!
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// above we have our main function that is asynchronous. when we call the main function the syntax after the call is for waiting the call to finish and then print any errors it gets.

async function setupMovieNight() {
  await cookPopcorn();
  await pourDrinks();
  startMovie();
}

/*

NOTES!!!

synchronous [solidity]
asynchronous [javascript]

cooking
Synchronous
1. Put popcorn in microwave -> Promise
2. Wait for popcorn to finish
3. Pour drinks for everyone

Asynchronous
1. Put popcorn in the mircrowave
2. Pour drinks for everyone
3. Wait for popcorn to finish

Promise
Pending
Fulfilled
Rejected

if we want our code to execute in order or function by function we can utilize the asyn function and label the function await functionName() ...await can only be used with async functions. await functions are promise based and the promise needs to be fulfilled before moving to the next function. most of the functions we will be using for blockchain development will be async (asynchronous). When we deploy a contract we have to wait until its deployed so we need to use asynchronous code.

*/
