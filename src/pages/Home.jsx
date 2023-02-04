import React from "react";
import elite_1 from "../assets/1649668915457.png";
import elite_2 from "../assets/1649664417576.png";
import elite_3 from "../assets/1649674832304.png";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const Home = () => {
  const goToAirdrop = () => {
    window.location.href = "/airdrop";
  };
  return (
    <div className="mt-3">
      <Card className="my-5 bg-dark">
        <Card.Body>
          <Card.Title className="text-primary">MEHG TOKEN</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-primary">Airdrop Program</Card.Subtitle>
          <Card.Text as="h5" className="text-white">
            Meta Elite Hunger Games P2E Airdrop Program is designed to empower thousands of prospective MEHG gamers from around the globe, With a
            Robust Liquidity of 70% and 999 Years Extreme Liquidity Lock gives the project the MiDAS Touch for a promising future. Earn upto $3,000
            completing Position MEGA 1 to 3.
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="mt-5 mx-3">
        <Col xs={12} md={4}>
          <Card>
            <Card.Img variant="top" src={elite_1} />
            <Card.Body>
              <Card.Subtitle as="h1">Mega 1</Card.Subtitle>
              <Card.Title>250 MEHG</Card.Title>
              <Card.Text>Referee 10 Members</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Img variant="top" src={elite_2} />
            <Card.Body>
              <Card.Subtitle>Mega 1</Card.Subtitle>
              <Card.Title>250 MEHG</Card.Title>
              <Card.Text>Referee 10 Members</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Img variant="top" src={elite_3} />
            <Card.Body>
              <Card.Subtitle>Mega 1</Card.Subtitle>
              <Card.Title>250 MEHG</Card.Title>
              <Card.Text>Referee 10 Members</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="text-center my-5">
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button variant="primary" onClick={() => goToAirdrop()}>
            Get Started
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
