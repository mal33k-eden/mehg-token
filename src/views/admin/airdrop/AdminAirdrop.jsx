import React from "react";
import Papa from "papaparse";
import { useContext, useCallback, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminContext from "../../../context/admin";
import InvestorsContext from "../../../context/users";
const AdminAirdrop = () => {
  const { airdropStatus, switchAirdropStatus, returnAirDropFunds, approveAirDrop } = useContext(AdminContext);
  const { connectedAddress } = useContext(InvestorsContext);
  const [isPause, setIsPause] = useState();
  const vestingMonthRef = useRef(null);
  const [fileContent, setFileContent] = useState([]);
  const [validFile, setValidFile] = useState(false);

  const checkStatus = useCallback(async () => {
    var status = await airdropStatus();
    setIsPause(status);
  }, [connectedAddress]);

  useEffect(() => {
    if (connectedAddress) {
      checkStatus();
    }
  }, [connectedAddress]);

  const callApproveAirDrop = async () => {
    console.log(vestingMonthRef);
    const form = vestingMonthRef.current;
    const month = form["vestingMonths"].value;
    if (month > 0) {
      console.log(month);
      await approveAirDrop(month);
    } else {
      toast.error("kindly enter a valid month value");
    }
  };

  const validateFile = async (e) => {
    const fileObj = e.target.files[0];
    const fileType = fileObj.type;
    if (fileType == "text/csv") {
      Papa.parse(fileObj, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data);
          setFileContent(results.data);
          setValidFile(true);
        },
      });
    } else {
      setValidFile(false);
      toast.error("Unsupported File. Please upload a CSV file");
    }
  };
  const submitFile = async () => {
    fileContent.map((item, index) => {
      console.log(item);
    });
  };
  return (
    <Container className="mb-5">
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Approve
            </Card.Header>
            <Card.Body>
              <Form ref={vestingMonthRef}>
                <Form.Group className="mb-3" controlId="vestingMonths">
                  <Form.Label>enter month</Form.Label>
                  <Form.Control type="text" placeholder="Enter month" />
                </Form.Group>
              </Form>
              <Button variant="success" onClick={callApproveAirDrop}>
                Approve
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
              <Button variant={isPause ? "success" : "danger"} onClick={() => switchAirdropStatus(isPause)}>
                {isPause ? "Unpause Airdrop" : "Pause Airdrop"}
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Return Unclaimed Airdrop Tokens
            </Card.Header>
            <Card.Body>
              <Button variant="success" onClick={returnAirDropFunds}>
                Return
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5" className="text-primary">
              Upload Airdrop File
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="vestingMonths">
                  <Form.Label>enter month</Form.Label>
                  <Form.Control type="file" placeholder="Enter month" onChange={(e) => validateFile(e)} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={submitFile} disabled={!validFile}>
                Update File
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAirdrop;
