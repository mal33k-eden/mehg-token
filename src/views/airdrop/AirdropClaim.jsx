import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { usePapaParse } from "react-papaparse";
import { toast } from "react-toastify";
import InvestorsContext from "../../context/users";
import UTILS from "../../utils";
const AirdropClaim = ({ invites, bigTotal }) => {
  const { connectedAddress, claimToken } = useContext(InvestorsContext);
  const { readRemoteFile } = usePapaParse();
  const [errMsg, setErrMsg] = useState("");
  const [buttonAction, setButtonAction] = useState("CLAIM 250 MEHG TOKENS");
  const [percent, setPercent] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    let value = ((invites / bigTotal) * 100).toFixed(0);
    value !== 100 ? setPercent(value) : setPercent(100);
    getAirdropFile(connectedAddress);
  }, [invites, bigTotal]);

  const getAirdropFile = async (userAddress) => {
    readRemoteFile("http://mheg.gazelleweb-tech.com/mehg_airdrop.csv", {
      header: true,
      worker: true,
      complete: (results) => {
        let data = results.data;
        var profile = data.filter((item) => item["Wallet"].toLowerCase() == userAddress.toLowerCase());
        if (profile.length > 0) {
          if (profile[0]["Status"] == "Completed") {
            setTaskCompleted(true);
          } else {
            setTaskCompleted(false);
          }
        } else {
          setTaskCompleted(false);
        }
      },
    });
  };

  const claimTokenAttempt = async () => {
    if (taskCompleted) {
      if (bigTotal > UTILS.stage_1) {
        setButtonAction("Pending");
      } else {
        await claimToken(250);
      }
    } else {
      toast.error("You have not completed the required task. Please speak to our admins for directions.");
    }
  };
  return (
    <Col xs={{ span: 12, order: "first" }} md={{ span: 6, order: "last" }} className="">
      <Card className="">
        <Card.Header>Claim Airdrop</Card.Header>
        <Card.Body style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <Card.Subtitle>
            {invites <= UTILS.stage_1 && "Position: Mega 1"}
            {invites > UTILS.stage_1 && invites <= UTILS.stage_2 && "Position: Mega 2"}
            {invites > UTILS.stage_2 && "Position: Mega 3"}
          </Card.Subtitle>
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbarWithChildren value={percent} styles={buildStyles({ pathColor: `#36d399` })}>
              <div style={{ fontSize: "1.5rem", marginTop: -5 }}>
                <strong>{percent}%</strong>
              </div>
            </CircularProgressbarWithChildren>
          </div>

          <Card.Text>{invites} Referral(s)</Card.Text>
          <Button variant="primary" className="btn btn-success" onClick={claimTokenAttempt}>
            {buttonAction}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AirdropClaim;
