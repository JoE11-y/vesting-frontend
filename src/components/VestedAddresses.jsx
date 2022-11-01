import React from "react";
import { Table, Button } from "react-bootstrap";

const VestedAddresses = () => {
  const addresses = ["0x0001", "0x0002", "0x0003", "0x0004", "0x0005"];
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
                <span>{address}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="outline-dark">Add Address</Button>
    </div>
  );
};

export default VestedAddresses;
