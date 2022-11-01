import React from "react";
import { Dropdown } from "react-bootstrap";
import wallet from "../assets/img/wallet.svg";
import { useWeb3Context } from "../context/web3Context";

const NavDropDown = () => {
  const {
    state: { account },
    updateAccount,
  } = useWeb3Context();

  const disconnect = () => {
    updateAccount({ account: "", provider: null });
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          align="end"
          id="dropdown-basic"
          className="d-flex align-items-center border rounded-pill py-1"
        >
          <div className="wallet">
            <img src={wallet} alt="wallet" />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="shadow-lg border-0">
          <Dropdown.Item
            href={`https://mumbai.polygonscan.com/address/${account}`}
            target="_blank"
            className="d-flex align-items-center"
          >
            <i
              className="bi bi-person-circle me-2 fs-4"
              style={{ color: "black" }}
            ></i>
            Address
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            as="button"
            className="d-flex align-items-center"
            onClick={() => {
              disconnect();
            }}
          >
            <i
              className="bi bi-box-arrow-right me-2 fs-4"
              style={{ color: "black" }}
            />
            DISCONNECT
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default NavDropDown;
