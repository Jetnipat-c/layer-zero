import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { PingPong__factory } from "../../typechain-types";

export async function deployPingPongMumbai() {
  const ethEndpoint = "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8";

  const PingPongMumbai = (await ethers.getContractFactory(
    "PingPong"
  )) as PingPong__factory;

  const pingPong = await PingPongMumbai.deploy(ethEndpoint);
  await pingPong._deployed();

  console.log("Deployed PingPongMumbai to: ", pingPong.address);

  await addressUtils.saveAddresses(hre.network.name, {
    pingPong: pingPong.address,
  });
}

deployPingPongMumbai().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
