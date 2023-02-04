import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import AdminAirdrop from "../views/admin/airdrop/AdminAirdrop";
import AdminSale from "../views/admin/sale/AdminSale";

const Admin = () => {
  return (
    <div className="mt-5">
      <Tabs defaultActiveKey="airdrop" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="airdrop" title="Airdrop">
          <AdminAirdrop />
        </Tab>
        <Tab eventKey="sale" title="Sale">
          <AdminSale />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
