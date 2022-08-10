import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { PingPong__factory } from "../../typechain-types";

export async function deployPingPongBSC() {
  const bscEndpoint = "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1";

  const PingPongBSC = (await ethers.getContractFactory(
    "PingPong"
  )) as PingPong__factory;

  const pingPong = await PingPongBSC.deploy(bscEndpoint);
  await pingPong._deployed();

  console.log("Deployed PingPongBSC to: ", pingPong.address);

  await addressUtils.saveAddresses(hre.network.name, {
    pingPong: pingPong.address,
  });
}

deployPingPongBSC().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
