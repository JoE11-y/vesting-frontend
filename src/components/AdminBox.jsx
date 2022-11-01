import React, { useState } from "react";
import { Table, Button, Form, FloatingLabel } from "react-bootstrap";
import { truncateAddress } from "../utils/conversions";

const AdminBox = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const [newSchedule, setNewSchedule] = useState(1);
  const [newAmount, setNewAmount] = useState(1);

  const admin = "0x0s0s0dsdfjksdlsdskjdfsdjfk";

  return (
    <div className="col adminBox">
      <Table className="table-borderless">
        <thead>
          <tr>
            <th>Admin Functions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>
                Admin:{" "}
                <a
                  href={`https://mumbai.polygonscan.com/address/${admin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(admin)}
                </a>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <Form>
                <FloatingLabel
                  controlId="inputAddress"
                  label="Enter Address "
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setAdminAddress(e.target.value);
                    }}
                    placeholder="Enter new address"
                  />
                </FloatingLabel>
                <Button variant="outline-dark" style={{ width: "10rem" }}>
                  Change Admin
                </Button>
              </Form>
            </td>
          </tr>
          <tr>
            <td>
              <Form>
                <FloatingLabel
                  controlId="inputAddress"
                  label="Enter schedule in minutes"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    min={1}
                    onChange={(e) => {
                      setNewSchedule(e.target.value);
                    }}
                    placeholder="Enter new address"
                  />
                </FloatingLabel>
                <Button variant="outline-dark" style={{ width: "10rem" }}>
                  Change Schedule
                </Button>
              </Form>
            </td>
          </tr>
          <tr>
            <td>
              <Form>
                <FloatingLabel
                  controlId="inputAddress"
                  label="Enter amount"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    min={1}
                    onChange={(e) => {
                      setNewAmount(e.target.value);
                    }}
                    placeholder="Enter amount of tokens"
                  />
                </FloatingLabel>
                <Button variant="outline-dark" style={{ width: "10rem" }}>
                  Change Amount
                </Button>
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBox;
