import addressUtils from "../../utils/addressUtils";
import hre, { ethers } from "hardhat";
import {} from "../../typechain-types";
import { OmniCounter__factory } from "../../typechain-types/factories/contracts/OmniCounter__factory";

export async function deployOmniCounterMATIC() {
  const ethEndpoint = "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8";

  const OmniCounterMATIC = (await ethers.getContractFactory(
    "OmniCounter"
  )) as OmniCounter__factory;

  const OmniCounter = await OmniCounterMATIC.deploy(ethEndpoint);
  await OmniCounter.deployed();

  console.log("Deployed OmniCounterMATIC to: ", OmniCounter.address);

  await addressUtils.saveAddresses(hre.network.name, {
    omniCounter: OmniCounter.address,
  });
}

deployOmniCounterMATIC().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
