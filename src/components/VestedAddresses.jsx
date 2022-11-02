import React, { useState, useCallback, useEffect } from "react";
import { Table, Button, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { truncateAddress } from "../utils/conversions";
import { useWeb3Context } from "../context/web3Context";
import { getVestedAddresses, addNewVestedAddress } from "../api/vesting";

const VestedAddresses = () => {
  const {
    state: { account, provider },
  } = useWeb3Context();

  const [loading, setLoading] = useState(false);

  const [vestedAddresses, setVestedAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  const getAddress = useCallback(async () => {
    const vestedAddress = await getVestedAddresses();
    setVestedAddresses(vestedAddress);
  }, []);

  const addAddress = async () => {
    if (account && provider) {
      if (!newAddress) return;
      setLoading(true);
      try {
        await addNewVestedAddress(provider, newAddress);
        setNewAddress("");
        getAddress();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  return (
    <div className="col addressBox">
      <Table>
        <thead>
          <tr>
            <th>Vested Addresses</th>
          </tr>
        </thead>
        <tbody>
          {vestedAddresses.map((address, index) => (
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
            value={newAddress}
            placeholder="Add address"
          />
        </FloatingLabel>
        <Button
          variant="outline-dark"
          onClick={() => addAddress()}
          style={{ width: "10rem" }}
          disabled={!(account && provider && newAddress)}
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
            "Add Address"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default VestedAddresses;
