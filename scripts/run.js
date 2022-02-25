const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract address:", waveContract.address);

  // Get the balance of the contract address
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "This is the contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  //Test sending a few waves

  const waveTxn = await waveContract.wave("Wave #1");
  await waveTxn.wait(); // Wait for the transaction to be mined

  const waveTxn2 = await waveContract.wave("Wave #2");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "This is the contract address:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract
  //   .connect(randomPerson)
  //   .wave("Back at it again with another wave!");
  // await waveTxn.wait(); //Waiting for the tx to be mined

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
