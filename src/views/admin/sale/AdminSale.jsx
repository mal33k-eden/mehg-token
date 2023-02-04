import React from "react";
import { useState, useContext, useRef, useCallback, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminContext from "../../../context/admin";
import InvestorsContext from "../../../context/users";

const AdminSale = () => {
  const { privateSaleStatus, switchPrivateSaleStatus, returnUnsoldFunds, releaseVested, setVestingPeriods, showVestingPeriod, getTokenHolder } =
    useContext(AdminContext);
  const { connectedAddress, globalCurrentSale, updateCurrentSale } = useContext(InvestorsContext);
  const [isPause, setIsPause] = useState();
  const releaseVestedForm = useRef(null);
  const tokenHolderForm = useRef(null);
  const updateCurrentSaleForm = useRef(null);
  const vestingPeriodForm = useRef(null);
  const setVestingPeriodsForm = useRef(null);
  const [vestingDetailsMessage, setVestingDetailsMessage] = useState(null);
  const [tokenHolderMessage, setTokenHolderMessage] = useState(null);
  const [currentSale, setCurrentSale] = useState(globalCurrentSale);

  const checkStatus = useCallback(async () => {
    var status = await privateSaleStatus();
    setIsPause(status);
  }, [connectedAddress]);

  useEffect(() => {
    if (connectedAddress) {
      checkStatus();
      setCurrentSale(globalCurrentSale);
    }
  }, [connectedAddress, globalCurrentSale]);
  const releaseVestedToken = async () => {
    const form = releaseVestedForm.current;
    const month = form["unlockSchedule"].value;
    await releaseVested(month);
  };

  const manageCurrentSale = async () => {
    console.log(currentSale);
    updateCurrentSale(currentSale);
  };
  const setVestedToken = async () => {
    const form = setVestingPeriodsForm.current;
    const schedule = form["unlockSchedule"].value;
    const month = form["vestingMonths"].value;
    const amount = form["releaseAmount"].value;
    await setVestingPeriods(schedule, month, amount);
  };
  const getVestingDetails = async () => {
    const form = vestingPeriodForm.current;
    const input = form["input"].value;
    console.log(input);
    var results = await showVestingPeriod(input);

    if (results) {
      let re_amount = results["releaseAmount"];
      let is_release = results["released"];
      let created = results["vestingCreated"];
      let end = results["vestingEnd"];
      setVestingDetailsMessage(`Released Amount: ${re_amount} | Is Released: ${is_release} | Created: ${created} | End: ${end}`);
    } else {
    }
  };
  const showTokenHolders = async () => {
    const form = tokenHolderForm.current;
    const address = form["address"].value;
    const input = form["input"].value;
    var results = await getTokenHolder(address, input);

    if (results) {
      let re_amount = results["releaseAmount"];
      let is_release = results["released"];
      let created = results["vestingCreated"];
      let end = results["vestingEnd"];
      setTokenHolderMessage(`Released Amount: ${re_amount} | Is Released: ${is_release} | Created: ${created} | End: ${end}`);
    } else {
      toast.warning("No records found");
    }
  };

  return (
    <Container className="mb-5">
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Update Current Sale
            </Card.Header>
            <Card.Body>
              <Form ref={updateCurrentSaleForm}>
                <Form.Check
                  className="mb-3"
                  type="radio"
                  id="sale_1"
                  label="Private Sale 1"
                  name="sale"
                  checked={currentSale === "sale_1"}
                  onChange={(e) => setCurrentSale("sale_1")}
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  id="sale_2"
                  label="Private Sale 2"
                  name="sale"
                  checked={currentSale === "sale_2"}
                  onChange={(e) => setCurrentSale("sale_2")}
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  id="seed_sale"
                  label="Seed Sale"
                  name="sale"
                  checked={currentSale === "seed_sale"}
                  onChange={(e) => setCurrentSale("seed_sale")}
                />
              </Form>
              <Button variant="success" onClick={manageCurrentSale}>
                Update Current Sale
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Set Vesting Periods
            </Card.Header>
            <Card.Body>
              <Form ref={setVestingPeriodsForm}>
                <Form.Group className="mb-3" controlId="unlockSchedule">
                  <Form.Label>Enter Schedule</Form.Label>
                  <Form.Control type="text" placeholder="_unlockSchedule" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="vestingMonths">
                  <Form.Label>Enter Month</Form.Label>
                  <Form.Control type="text" placeholder="_vestingMonths" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="releaseAmount">
                  <Form.Label>Enter Amount</Form.Label>
                  <Form.Control type="text" placeholder="_releaseAmount" />
                </Form.Group>
              </Form>
              <Button variant="success" onClick={setVestedToken}>
                SET
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Token Holder
            </Card.Header>
            <Card.Body>
              {tokenHolderMessage && <Alert variant={"info"}>{tokenHolderMessage}</Alert>}
              <Form ref={tokenHolderForm}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Enter Address</Form.Label>
                  <Form.Control type="text" placeholder="enter address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="input">
                  <Form.Label>Enter Input</Form.Label>
                  <Form.Control type="text" placeholder="enter input" />
                </Form.Group>
              </Form>
              <Button variant="success" onClick={showTokenHolders}>
                Show
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Release Vested
            </Card.Header>
            <Card.Body>
              <Form ref={releaseVestedForm}>
                <Form.Group className="mb-3" controlId="unlockSchedule">
                  <Form.Label>Enter Schedule</Form.Label>
                  <Form.Control type="text" placeholder="_unlockSchedule" />
                </Form.Group>
              </Form>
              <Button variant="success" onClick={releaseVestedToken}>
                Release
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Show Vesting Period
            </Card.Header>

            <Card.Body>
              {vestingDetailsMessage && <Alert variant={"info"}>{vestingDetailsMessage}</Alert>}
              <Card.Subtitle>Current Vesting Count: 0</Card.Subtitle>
              <Form className="mt-4" ref={vestingPeriodForm}>
                <Form.Group className="mb-3" controlId="input">
                  <Form.Label>Enter Input</Form.Label>
                  <Form.Control type="text" placeholder="input" />
                </Form.Group>
              </Form>
              <Button variant="success" onClick={getVestingDetails}>
                Show
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mb-5">
            <Card.Header as="h5" className="text-primary">
              Pause & Unpause
            </Card.Header>
            <Card.Body>
              <Button variant={isPause ? "success" : "danger"} onClick={() => switchPrivateSaleStatus(isPause)}>
                {isPause ? "Unpause Sale" : "Pause Sale"}
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Return Unsold Tokens
            </Card.Header>
            <Card.Body>
              <Button variant="success" onClick={returnUnsoldFunds}>
                Return
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSale;
