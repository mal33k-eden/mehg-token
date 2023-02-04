import React, { useContext, useCallback, useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import SaleContext from "../../context/sale";

const AllowanceApproved = ({ currAllowance, token, refresh }) => {
  const { approveAllowance, allowance, buyMEHG } = useContext(SaleContext);
  useEffect(() => {
    refresh().then(() => {
      console.log(allowance);
    });
  }, [allowance]);
  const runApprove = async () => {
    await approveAllowance(0);
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-primary flex-column">
      <h3>MHEG TOKEN: MHEG {currAllowance}</h3>
      <h4>ALLOWANCE APPROVED: BUSD {token}</h4>
      <Button className="m-3 btn-success" onClick={buyMEHG}>
        CONFIRM & BUY MHEG TOKEN
      </Button>
      <Button className="m-3 btn-sm bg-primary" onClick={() => runApprove()}>
        CANCEL ALLOWANCE
      </Button>
    </div>
  );
};

export default AllowanceApproved;
