import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import InvestorsContext from "../../context/users";
import { toast } from "react-toastify";
const AirdropRegister = ({ referredBy, checkRegistered }) => {
  const { generateLink, whitelistReferredAddress, formatAddress, connectedAddress } = useContext(InvestorsContext);
  const [isClicked, setIsClicked] = useState(false);
  const [formatedReferedBy, setFormatedReferedBy] = useState("");
  const registerForAirdrop = async () => {
    setIsClicked(true);
    let res = await whitelistReferredAddress(referredBy);
    console.log(res);

    const createLink = await generateLink(connectedAddress, referredBy);
    console.log(createLink);
    if (createLink) {
      toast.success("Your airdrop referral and task link created successfully!");
      toast.onChange((payload) => {
        if (payload.status == "removed") {
          // setIsClicked(false)
          checkRegistered();
        }
      });
    } else {
      toast.error("You are not able to generate your referral and task link. Kindly speak with admin.");
      setIsClicked(false);
    }
  };
  useEffect(() => {
    let newAdd = formatAddress(referredBy);
    setFormatedReferedBy(newAdd);
  }, [referredBy]);

  return (
    <Col className="">
      <Card className="m-2">
        <Card.Header>Referred By</Card.Header>
        <Card.Body>
          <Card.Title>{formatedReferedBy}</Card.Title>
          <Card.Subtitle>Click the button below to reveal your task link and your special referral link.</Card.Subtitle>
          <Button variant="primary" onClick={registerForAirdrop}>
            Generate Task Link
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AirdropRegister;
