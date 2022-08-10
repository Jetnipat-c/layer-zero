import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { OmniCounter__factory } from "../../typechain-types";

export async function deployCounterBSC() {
  const bscEndpoint = "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1";

  const OmniCounterBSC = (await ethers.getContractFactory(
    "OmniCounter"
  )) as OmniCounter__factory;

  const omniCounter = await OmniCounterBSC.deploy(bscEndpoint);
  await omniCounter.deployed();

  console.log("Deployed OmniCounterBSC to: ", omniCounter.address);

  await addressUtils.saveAddresses(hre.network.name, {
    omniCounter: omniCounter.address,
  });
}

deployCounterBSC().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
