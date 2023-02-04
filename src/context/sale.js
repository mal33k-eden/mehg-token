import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import UTILS from "../utils";
import InvestorsContext from "./users";

const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const { web3Pvdr, connectedAddress, contracts, globalCurrentSale, saleDetails } = useContext(InvestorsContext);
  const [allowance, setAllowance] = useState(0);

  const currentAllowance = useCallback(async () => {
    await checkAllowance();
  }, [connectedAddress, saleDetails, allowance]);
  useEffect(() => {
    if (connectedAddress) {
      currentAllowance();
    }
  }, [web3Pvdr, globalCurrentSale, saleDetails, allowance]);

  const approveAllowance = async (amount) => {
    let _value = ethers.utils.parseEther(amount.toString());
    let _spender = saleDetails.address;
    try {
      await contracts.busd.approve(_spender, _value);
      await checkAllowance();
      toast.success("Allowance approved successfully");
      toast.warning("Kindly be aware that this process might take few minutes for update. Refresh your browser after a few seconds.");
    } catch (err) {
      toast.error("Allowance not approved");
    }

    return false;
  };

  const buyMEHG = async () => {
    try {
      var allowance = await checkAllowance();
      if (parseInt(allowance) > 0) {
        var _amount = ethers.utils.parseEther(allowance.toString());
        await contracts.sale.BuymehgToken(_amount);
        toast.success("Purchase order placed successfully");
      }
      toast.info("You do not have enough allowance to buy MHEG Token");
    } catch (error) {
      toast.error("Purchase order not placed");
      toast.error(error.reason);
    }
  };

  const checkAllowance = async () => {
    let amount = 0;
    let _owner = connectedAddress;
    let _spender = saleDetails.address;

    try {
      amount = await contracts.busd.allowance(_owner, _spender);
      // convert amount to ETH and parseInt
      amount = ethers.utils.formatEther(amount);
      setAllowance(parseFloat(amount));
    } catch (err) {
      console.log(err);
    }

    return amount;
  };

  return <SaleContext.Provider value={{ approveAllowance, buyMEHG, allowance, currentAllowance, checkAllowance }}>{children}</SaleContext.Provider>;
};

export default SaleContext;
