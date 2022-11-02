import { ethers } from "ethers";

export async function connectWalletMetamask() {
  const { ethereum } = window;

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(ethereum);

  return { provider: provider, account: accounts[0] || "" };
}
