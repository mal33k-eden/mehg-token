import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { Button, NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import InvestorsContext from "../context/users";
const MenuBar = () => {
  const { connectWallet, disconnectWallet, connectedAddress } = useContext(InvestorsContext);
  useEffect(() => {
    console.log(connectedAddress);
  }, [connectedAddress]);
  return (
    <div>
      <Navbar collapseOnSelect className="nav-bar-bg" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="MEHG TOKEN LOGO" className=" float-left" style={{ width: "200px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/airdrop">MEHG Airdrop</Nav.Link>
              <Nav.Link href="/sale">MEHG Sale</Nav.Link>
            </Nav>

            <Nav>
              {connectedAddress ? (
                <Button variant="danger" onClick={disconnectWallet}>
                  Dis-connect Wallet
                </Button>
              ) : (
                <Button variant="success" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MenuBar;
