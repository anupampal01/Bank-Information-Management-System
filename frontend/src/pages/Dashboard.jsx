import { useEffect, useState } from "react";
import BankForm from "../components/BankForm";
import BankList from "../components/BankList";
import API from "../services/api";

const Dashboard = () => {
  const [banks, setBanks] = useState([]);

  const fetchBanks = async () => {
    const res = await API.get("/banks");
    setBanks(res.data);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <BankForm fetchBanks={fetchBanks} />
      <BankList banks={banks} fetchBanks={fetchBanks} />
    </div>
  );
};

export default Dashboard;
