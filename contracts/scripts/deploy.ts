import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const ContractFactory = await ethers.getContractFactory(
    "PrivateSchoolEligibility"
  );

  const contract = await ContractFactory.deploy(deployer.address);

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("PrivateSchoolEligibility deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
