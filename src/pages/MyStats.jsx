import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import InvestorsContext from "../context/users";
import AirdropRegister from "../views/airdrop/AirdropRegister";
import AirdropStatistics from "../views/airdrop/AirdropStatistics";
import AirdropClaim from "../views/airdrop/AirdropClaim";

const MyStats = () => {
  const { addressExist, connectedAddress, getReferredAddresses } = useContext(InvestorsContext);
  const { referredByUrl = "0x0000000000000000000000000000000000000000" } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [referredBy, setReferredBy] = useState(referredByUrl);
  const [invites, setInvites] = useState(0);
  const [bigTotal, setBigTotal] = useState(2);
  useEffect(() => {
    console.log(referredByUrl);
    if (connectedAddress) {
      checkRegistered();
      getReferredAddresses().then((value) => {
        setInvites(value);
        if (invites <= 2) {
          setBigTotal(2);
        }
        if (invites > 10 && invites <= 50) {
          setBigTotal(50);
        }
        if (invites > 50) {
          setBigTotal(100);
        }
      });
    }
  }, [connectedAddress, isRegistered]);

  const checkRegistered = () => {
    addressExist(connectedAddress).then((value) => {
      setIsRegistered(value.status);
      if (value.status) {
        setReferredBy(value.invitedBy);
      }
    });
  };

  return (
    <div className="my-3">
      <div>
        <div className="text-center pt-3 text-primary">
          <h1>
            <strong>Welcome To MEHG Airdrop</strong>
          </h1>
          <h4>Click the button below to reveal your task link and your special referral link.</h4>
        </div>
      </div>
      <Row>
        {connectedAddress ? (
          <>
            {isRegistered ? (
              <>
                <AirdropStatistics referredBy={referredBy} invites={invites} /> <AirdropClaim invites={invites} bigTotal={bigTotal} />
              </>
            ) : (
              <AirdropRegister referredBy={referredByUrl} checkRegistered={checkRegistered} />
            )}
          </>
        ) : (
          <>hello</>
        )}
      </Row>
    </div>
  );
};

export default MyStats;
