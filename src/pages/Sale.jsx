import React, { useContext, useCallback, useEffect, useState } from "react";
import { Form, Alert, Button, Card, Col, Row } from "react-bootstrap";
import SaleContext from "../context/sale";
import InvestorsContext from "../context/users";
import ApproveAllowance from "../views/sale/ApproveAllowance";
import AllowanceApproved from "../views/sale/AllowanceApproved";
const Sale = () => {
  const { currentAllowance, checkAllowance, allowance } = useContext(SaleContext);
  const { saleDetails, connectedAddress, contracts } = useContext(InvestorsContext);
  const [tkValue, setTkValue] = useState(0);

  const refreshAllowance = useCallback(async () => {
    var a = await checkAllowance();
  }, [connectedAddress, saleDetails, allowance]);
  useEffect(() => {
    if (connectedAddress && saleDetails.address) {
      checkAllowance();
      setTkValue(allowance / saleDetails.price);
    }
  }, [connectedAddress, saleDetails, allowance]);
  return (
    <div className="my-3">
      <Row>
        <Col xs={12} md={6}>
          <Card className="m-2">
            <Card.Body>
              <Card.Title>MEHG TOKEN SALE</Card.Title>
              <Card.Subtitle>{saleDetails.title}</Card.Subtitle>
              <Card.Text>- {saleDetails.supply}</Card.Text>
              <Card.Text>- {saleDetails.tge}</Card.Text>
              <Card.Text>- {saleDetails.unlock_plan}</Card.Text>
              <button type="button" className="m-3 btn-success btn btn-primary">
                SEE SALE CONTRACT
              </button>
            </Card.Body>
          </Card>
          <Card className="m-2 my-5">
            <Card.Body>
              <Card.Subtitle>Price</Card.Subtitle>
              <Card.Title>{saleDetails.pricing}</Card.Title>
              <Button className="m-3 btn-success">Min Purchase: {saleDetails.min}</Button>
              <Button className="m-3 btn-success">Max Purchase: {saleDetails.max}</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Alert variant="warning" className="bg-warning border-0">
            <Alert.Heading>Kindly Note The Following</Alert.Heading>
            <hr />
            <p className="mb-0">- All purchases will be made using BUSD BEP 20</p>
            <p className="mb-0">- Don’t use any wallet used in MEHG Airdrop, Seed Sales or Previous Privates Sales</p>
          </Alert>
          <Card className="m-2 my-5">
            <Card.Body>
              <Card.Subtitle>Buy MHEG TOKEN</Card.Subtitle>
              {allowance > 0 ? (
                <AllowanceApproved currAllowance={allowance} token={tkValue} refresh={refreshAllowance} />
              ) : (
                <ApproveAllowance refresh={refreshAllowance} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Sale;
