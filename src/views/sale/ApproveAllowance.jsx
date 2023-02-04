import React, { useContext, useCallback, useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import SaleContext from "../../context/sale";
import InvestorsContext from "../../context/users";
const ApproveAllowance = ({ refresh }) => {
  const { approveAllowance, allowance } = useContext(SaleContext);
  const { saleDetails, connectedAddress, contracts } = useContext(InvestorsContext);
  const allowanceForm = useRef();
  const [tokenValue, setTokenValue] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [isAmountValid, setIsAmountValid] = useState(true);
  useEffect(() => {
    console.log(allowance);
  }, [allowance]);
  const validateAllowance = (value) => {
    var value = parseInt(value);
    var v = isNaN(value) ? 0 : value;
    if (v >= saleDetails.min_buy && v <= saleDetails.max_buy) {
      setIsAmountValid(false);
    } else {
      setIsAmountValid(true);
    }
  };
  const handlePriceChange = (event) => {
    var val = event.target.value;
    var tv = (val / saleDetails.price).toFixed(1);
    setTokenValue(tv);
    setInvestment(val);
    validateAllowance(val);
  };

  const approveInvestment = async () => {
    await approveAllowance(investment);
    await refresh();
  };

  return (
    <div>
      <Form ref={allowanceForm}>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label></Form.Label>
          <Form.Control type="number" placeholder="e.g 200" onChange={handlePriceChange} />
          <Form.Text className="text-muted text-primary">{tokenValue} MHEG</Form.Text>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicCheckbox">
          <Form.Label></Form.Label>
        </Form.Group>
      </Form>

      <Button className="m-1 btn-warning" disabled={isAmountValid} onClick={() => approveInvestment()}>
        CREATE ALLOWANCE
      </Button>
    </div>
  );
};

export default ApproveAllowance;
