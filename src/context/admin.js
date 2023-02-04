import { useEffect } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import InvestorsContext from "./users";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { contracts, web3Pvdr } = useContext(InvestorsContext);

  useEffect(() => {
    if (web3Pvdr) {
      console.log("loaded");
    }
  }, [web3Pvdr]);
  const airdropStatus = async () => {
    let status = false;
    try {
      status = await contracts.airdrop.paused();
    } catch (err) {}
    return status;
  };
  const switchAirdropStatus = async (curstatus) => {
    let status = false;
    try {
      curstatus ? await contracts.airdrop.unpauseAirdrop() : await contracts.airdrop.pauseAirdrop();
      status = true;
      toast.success("Airdrop status changed.");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const returnAirDropFunds = async () => {
    let status = false;
    try {
      await contracts.airdrop.returnAirdropBalToken();
      status = true;
      toast.success("Airdrop tokens returned.");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const approveAirDrop = async (_vestingMonth) => {
    let status = false;
    try {
      await contracts.airdrop.approveAirdrop(_vestingMonth);
      status = true;
      toast.success("Vesting month set successfully");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }
    return status;
  };
  const releaseVested = async (_unlockSchedule) => {
    let status = false;
    try {
      await contracts.sale.releaseVestedToken(_unlockSchedule);
      toast.success("released vested token successfully");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const setVestingPeriods = async (_unlockSchedule, _releaseAmount, _vestingMonths) => {
    let status = false;
    try {
      await contracts.sale.releaseVestedToken(_unlockSchedule, _releaseAmount, _vestingMonths);
      toast.success("vesting period set successfully");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const privateSaleStatus = async () => {
    var status = false;
    try {
      status = await contracts.sale.paused();
    } catch (error) {
      console.log(error);
      status = false;
    }

    return status;
  };
  const switchPrivateSaleStatus = async (curstatus) => {
    let status = false;
    try {
      curstatus ? await contracts.sale.unpauseFirstPrivateSales() : await contracts.sale.pauseFirstPrivateSales();
      toast.success("sale status switched successfully");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const returnUnsoldFunds = async () => {
    let status = false;

    try {
      await contracts.sale.returnUnsoldToken();
      toast.success("tokens returned successfully");
    } catch (error) {
      toast.error(error.reason);
      status = false;
    }

    return status;
  };
  const showVestingPeriod = async (input) => {
    let status = false;
    try {
      let res = await contracts.sale.vestingPeriod({ "": input });
      return res;
    } catch (error) {
      status = false;
      toast.error(error.reason);
    }

    return status;
  };
  const getTokenHolder = async (address, input) => {
    let status = false;
    try {
      let res = await contracts.token.tokenHolders({ "": address, "": input });
      return res;
    } catch (error) {
      console.log(error);
      status = false;
    }

    return status;
  };

  return (
    <AdminContext.Provider
      value={{
        airdropStatus,
        switchAirdropStatus,
        returnAirDropFunds,
        approveAirDrop,
        releaseVested,
        setVestingPeriods,
        privateSaleStatus,
        switchPrivateSaleStatus,
        returnUnsoldFunds,
        showVestingPeriod,
        getTokenHolder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
