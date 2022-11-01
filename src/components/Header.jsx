import React from "react";
import { connectWalletMetamask } from "../api/web3";
import { Button } from "react-bootstrap";
import { useWeb3Context } from "../context/web3Context";
import NavDropDown from "./NavDropDown";

const Header = () => {
  const {
    state: { account },
    updateAccount,
  } = useWeb3Context();

  const onClickConnect = async () => {
    const data = await connectWalletMetamask();
    updateAccount(data);
  };
  console.log(account);
  return (
    <header className="main-header">
      <div className="logo">XYZ VESTING</div>
      <div className="main-nav">
        {account ? (
          <NavDropDown />
        ) : (
          <Button variant="outline-secondary" onClick={() => onClickConnect()}>
            Connect Wallet <i className="bi bi-wallet"></i>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
