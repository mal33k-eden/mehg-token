import React, { useContext, useEffect } from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import InvestorsContext from "../../context/users";
const AirdropStatistics = ({ referredBy, invites }) => {
  const { formatAddress, connectedAddress } = useContext(InvestorsContext);
  const copyReferralLink = () => {
    var copyText = document.getElementById("referralLink");
    navigator.clipboard.writeText(copyText.innerHTML);
    toast.info("Referral link copied to clipboard.");
  };
  const redirectToLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Col xs={{ span: 12, order: "last" }} md={{ span: 6, order: "first" }} className="">
      <Card className="m-2">
        <Card.Header className="text-primary">Referred By</Card.Header>
        <Card.Body>{formatAddress(referredBy)}</Card.Body>
      </Card>
      <Card className="m-2">
        <Card.Header className="text-primary">Total Referrals</Card.Header>
        <Card.Body> {invites}</Card.Body>
      </Card>
      <Card className="m-2">
        <Card.Header className="text-primary">Task Link</Card.Header>
        <Card.Body>
          <Badge pill className="bg-primary cursor" onClick={() => redirectToLink("https://gleam.io/competitions/7ftYz-mehg-airdrop-task")}>
            Click to open Task Link
          </Badge>
        </Card.Body>
      </Card>
      <Card className="m-2">
        <Card.Header className="text-primary">Invite Link</Card.Header>
        <Card.Body>
          <p className="overflow-auto" id="referralLink">
            Hello, I am inviting your to the MEHG token airdrop campaign. Follow this link to redeem free MEHG TOKENS :
            https://mehg.netlify.app/airdrop/referral/{connectedAddress}
          </p>
          <Badge pill onClick={copyReferralLink} className="bg-primary cursor">
            Click to copy invite link
          </Badge>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AirdropStatistics;
