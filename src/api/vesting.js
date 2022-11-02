import { ethers, BigNumber } from "ethers";
import vesting from "../utils/vesting.json";

const vestingCA = "0xc7a48e4059517dc13304e845Df925c7d055927a1";
const vestingAbi = vesting.abi;

export async function getAdmin() {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, provider);
  const admin = await vestingContract.admin();
  return admin;
}

export async function getVestingData() {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, provider);
  const admin = await vestingContract.admin();
  const tokenDeployer = await vestingContract.tokenDeployer();

  const vestingPeriod = BigNumber.from(
    await vestingContract.vestingPeriod()
  ).toNumber();

  const tokenReleaseInterval = BigNumber.from(
    await vestingContract.tokenReleaseInterval()
  ).toNumber();

  const amountToRelease = ethers.utils.formatEther(
    await vestingContract.amountToRelease()
  );

  const lastReleaseTime = BigNumber.from(
    await vestingContract.lastReleaseTimeStamp()
  ).toNumber();

  return {
    admin,
    tokenDeployer,
    vestingPeriod,
    amountToRelease,
    tokenReleaseInterval,
    lastReleaseTime,
  };
}

export async function getVestedAddresses() {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, provider);

  const vestedAddresses = await vestingContract.getVestedAddresses();

  return vestedAddresses;
}

export async function setAdmin(provider, adminAddress) {
  const signer = provider.getSigner();
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  if (!ethers.utils.isAddress(adminAddress)) return;

  const Txn = await vestingContract.setAdmin(adminAddress);
  console.log("Minning...", Txn.hash);
  await Txn.wait();
}

export async function addNewVestedAddress(provider, newAddress) {
  const signer = provider.getSigner();
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  if (!ethers.utils.isAddress(newAddress)) return;

  const Txn = await vestingContract.addVestedAddress(newAddress);

  console.log("Minning...", Txn.hash);
  await Txn.wait();
}

export async function sendTokens(provider) {
  const signer = provider.getSigner();

  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  const Txn = await vestingContract.sendTokens();

  console.log("Minning...", Txn.hash);
  await Txn.wait();
}

export async function updateReleaseInterval(provider, minutes) {
  const signer = provider.getSigner();

  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  const Txn = await vestingContract.updateReleaseInterval(minutes);

  console.log("Minning...", Txn.hash);
  await Txn.wait();
}

export async function updateAmount(provider, newAmount) {
  const signer = provider.getSigner();

  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  const Txn = await vestingContract.updateAmount(newAmount);

  console.log("Minning...", Txn.hash);
  await Txn.wait();
}
