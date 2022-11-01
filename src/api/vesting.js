import { ethers } from "ethers";
import vesting from "../utils/vesting.json";

const vestingCA = "0x6b4fd6d9fed25c9925a2b238503b45b8b75ee51d";
const vestingAbi = vesting.abi;

export async function getData(provider) {
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, provider);
  const admin = vestingContract.admin();
  const tokenDeployer = vestingContract.tokenDeployer();
  const vestingPeriod = vestingContract.vestingPeriod();
  const tokenReleaseInterval = vestingContract.tokenReleaseInterval();
  const amountToRelease = vestingContract.amountToRelease();

  return {
    admin,
    tokenDeployer,
    vestingPeriod,
    tokenReleaseInterval,
    amountToRelease,
  };
}

export async function setAdmin(provider, adminAddress) {
  const signer = provider.getSigner();
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  const Txn = await vestingContract.setAdmin(adminAddress);
  console.log("Minning...", Txn.hash);
  await Txn.wait();
}

export async function addNewVestedAddress(provider, newAddress) {
  const signer = provider.getSigner();
  const vestingContract = new ethers.Contract(vestingCA, vestingAbi, signer);

  const Txn = await vestingContract.addDisperseAddress(newAddress);

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
