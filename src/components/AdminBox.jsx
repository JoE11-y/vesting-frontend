import React, { useState, useCallback, useEffect } from "react";
import { Table, Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { truncateAddress } from "../utils/conversions";
import { useWeb3Context } from "../context/web3Context";
import {
  getAdmin,
  updateAmount,
  updateReleaseInterval,
  setAdmin,
} from "../api/vesting";

const AdminBox = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [adminAddress, setAdminAddress] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const {
    state: { account, provider },
  } = useWeb3Context();

  const getAdminAddress = useCallback(async () => {
    const adminAddress = await getAdmin();
    setAdminAddress(adminAddress);
  }, []);

  const startNewAdminTxn = async () => {
    if (account && provider) {
      setLoading(true);
      try {
        await setAdmin(provider, newAdmin);
        setNewAdmin("");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const startUpdateAmountTxn = async () => {
    if (account && provider) {
      setLoading1(true);
      try {
        await updateAmount(provider, newAmount);
        setNewAmount("");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading1(false);
      }
    }
  };

  const startUpdateIntervalTxn = async () => {
    if (account && provider) {
      setLoading2(true);
      try {
        await updateReleaseInterval(provider, newSchedule);
        setNewSchedule("");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading2(false);
      }
    }
  };

  useEffect(() => {
    getAdminAddress();
  }, [getAdminAddress]);

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
                  href={`https://mumbai.polygonscan.com/address/${adminAddress}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateAddress(adminAddress)}
                </a>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <Form>
                <FloatingLabel
                  controlId="inputAddress"
                  label="Enter address "
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setNewAdmin(e.target.value);
                    }}
                    value={newAdmin}
                    placeholder="Enter new address"
                  />
                </FloatingLabel>
                <Button
                  variant="outline-dark"
                  style={{ width: "10rem" }}
                  onClick={() => startNewAdminTxn()}
                  disabled={!(account && provider && newAdmin)}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Change Admin"
                  )}
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
                    value={newSchedule}
                    placeholder="Enter new schedule"
                  />
                </FloatingLabel>
                <Button
                  variant="outline-dark"
                  style={{ width: "10rem" }}
                  onClick={() => startUpdateIntervalTxn()}
                  disabled={!(account && provider && newSchedule)}
                >
                  {loading2 ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Change Schedule"
                  )}
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
                    value={newAmount}
                    placeholder="Enter amount of tokens"
                  />
                </FloatingLabel>
                <Button
                  variant="outline-dark"
                  style={{ width: "10rem" }}
                  onClick={() => startUpdateAmountTxn()}
                  disabled={!(account && provider && newAmount)}
                >
                  {loading1 ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Change Amount"
                  )}
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
