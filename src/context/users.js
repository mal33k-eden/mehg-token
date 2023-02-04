import { createContext, useEffect, useState } from "react";
import client from "../sanity";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UTILS from "../utils";
import { toast } from "react-toastify";
const InvestorsContext = createContext();

export const InvestorProvider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [web3Pvdr, setWeb3Pvdr] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [globalCurrentSale, setGlobalCurrentSale] = useState("sale_1");
  const [globalCurrentSaleId, setGlobalCurrentSaleId] = useState("sale_1");
  const [contracts, setContracts] = useState({
    airdrop: null,
    token: null,
    sale: null,
    busd: null,
  });
  const [saleDetails, setSaleDetails] = useState({
    title: null,
    supply: null,
    tge: null,
    unlock_plan: null,
    pricing: null,
    min: null,
    max: null,
  });

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        display: {
          logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          name: "Mobile",
          description: "Scan qrcode with your mobile wallet",
        },
        package: WalletConnectProvider,
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
        chainId: 56,
      },
    };
    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      disableInjectedProvider: false,
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);
  useEffect(() => {
    getCurrentSale();
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal, globalCurrentSale, saleDetails]);

  async function connectWallet() {
    const provider = await web3Modal.connect();

    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    setWeb3Pvdr(ethersProvider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    // let b = await ethersProvider.getSigner().getBalance();
    setConnectedAddress(userAddress);
    const airdrop_contract = new ethers.Contract(UTILS.airdropAddress, UTILS.airDropAbi, ethersProvider.getSigner());
    const token_contract = new ethers.Contract(UTILS.tokenAddress, UTILS.tokenAbi, ethersProvider.getSigner());
    const busd_contract = new ethers.Contract(UTILS.busdAddress, UTILS.busdAbi, web3Pvdr.getSigner());
    var sale_contract = new ethers.Contract(UTILS.seedAddress, UTILS.privateSaleAbi, ethersProvider.getSigner());
    var sale_details = UTILS.seed_details;
    if (globalCurrentSale == "sale_1") {
      sale_contract = new ethers.Contract(UTILS.saleAddress_1, UTILS.privateSaleAbi, ethersProvider.getSigner());
      sale_details = UTILS.sale_1_details;
    } else if (globalCurrentSale == "sale_2") {
      sale_contract = new ethers.Contract(UTILS.saleAddress_2, UTILS.privateSaleAbi, ethersProvider.getSigner());
      sale_details = UTILS.sale_2_details;
    }
    var contracts = { airdrop: airdrop_contract, token: token_contract, sale: sale_contract, busd: busd_contract };
    setContracts(contracts);
    setSaleDetails(sale_details);
  }
  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    window.location.reload();
  };
  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    // Subscribe to session disconnection
    web3ModalProvider.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });
  }
  // AIRDROP
  const addressExist = async (address) => {
    const params = {
      address: address,
    };
    const query = `*[_type == "referralLink" && lower(address) == '${address.toLowerCase()}'] {address, invitedBy}`;
    let records = await client.fetch(query, params);
    if (records.length > 0) {
      return { status: true, invitedBy: records[0]["invitedBy"] };
    }
    return { status: false };
  };
  const getCurrentSale = async (address) => {
    const query = `*[_type == "generalSettings"] {currentSale,_id}`;
    let res = await client.fetch(query);
    console.log(res);
    if (res.length > 0) {
      setGlobalCurrentSale(res[0].currentSale);
      setGlobalCurrentSaleId(res[0]._id);
    }
  };
  const updateCurrentSale = async (sale) => {
    console.log(globalCurrentSaleId);
    client
      .patch(globalCurrentSaleId) // Document ID to patch
      .set({ currentSale: sale })
      .commit() // Perform the patch and return a promise
      .then((updatedRecord) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const getAirdropDetails = async (address) => {
    const params = {
      address: address,
    };
    const query = `*[_type == "referralLink" && lower(address) == '${address}'] {address,invitedBy}`;
    let records = await client.fetch(query, params);
    return records[0];
  };
  const generateLink = async (connectedUser, referredBy) => {
    const isValid = await addressExist(connectedUser);
    if (isValid) return false;

    const participant = {
      _type: "referralLink",
      address: connectedUser,
      invitedBy: referredBy,
    };
    try {
      await client.create(participant);
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  const whitelistReferredAddress = async (_referredBy) => {
    try {
      // const params = { _referredBy: referredBy };
      const record = await contracts.airdrop.airdropWhitelist(_referredBy);
      return {
        status: true,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        msg: err || err.data.message,
      };
    }
  };
  const getReferredAddresses = async () => {
    var runContract = 0;
    let _referrer = connectedAddress;
    try {
      runContract = await contracts.airdrop.getReferral(_referrer);
      if (runContract != undefined) {
        return runContract.length;
      }
    } catch (err) {
      console.log(err.reason);
    }
    return runContract;
  };

  const claimToken = async (_amount) => {
    var from = UTILS.airdropAddress;
    var amount = ethers.utils.parseUnits(_amount, "ether");
    try {
      await contracts.token.transferFrom(from, amount);
      toast.success("You have claimed successfully.");
      return {
        status: true,
      };
    } catch (error) {
      console.log(error);
      toast.error("You have not completed the required task. Please speak to our admins for directions.");
    }
    return {
      status: false,
    };
  };

  const formatAddress = (address) => {
    var front = address.slice(0, 4);
    var back = address.slice(-4);
    return front + "....." + back;
  };
  return (
    <InvestorsContext.Provider
      value={{
        addressExist,
        getReferredAddresses,
        whitelistReferredAddress,
        generateLink,
        getAirdropDetails,
        connectWallet,
        disconnectWallet,
        formatAddress,
        claimToken,
        updateCurrentSale,
        saleDetails,
        web3Pvdr,
        connectedAddress,
        contracts,
        globalCurrentSale,
      }}
    >
      {children}
    </InvestorsContext.Provider>
  );
};

export default InvestorsContext;
