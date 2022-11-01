import React, { useState } from "react";
import { Table, Button, Form, FloatingLabel } from "react-bootstrap";
import { truncateAddress } from "../utils/conversions";

const VestedAddresses = () => {
  const addresses = [
    "0x000100000000000",
    "0x000200000000000000",
    "0x0003000000000000000",
    "0x000400000000000000000000",
    "0x0005000000000000000000000",
  ];
  const [newAddress, setNewAddress] = useState("");
  return (
    <div className="col addressBox">
      <Table>
        <thead>
          <tr>
            <th>Vested Addresses</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>
                <a
                  href={`https://mumbai.polygonscan.com/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(address)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <FloatingLabel
          controlId="inputAddress"
          label="Enter address"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => {
              setNewAddress(e.target.value);
            }}
            placeholder="Add address"
          />
        </FloatingLabel>
        <Button variant="outline-dark">Add Address</Button>
      </Form>
    </div>
  );
};

export default VestedAddresses;
