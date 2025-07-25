import { useState } from "react";
import API from "../services/api";

const BankForm = ({ fetchBanks }) => {
  const [bank, setBank] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/banks", bank);
      fetchBanks();
      setBank({ ifscCode: "", branchName: "", bankName: "", accountNumber: "", accountHolderName: "" });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="ifscCode" placeholder="IFSC Code" value={bank.ifscCode} onChange={handleChange} required />
      <input name="branchName" placeholder="Branch Name" value={bank.branchName} onChange={handleChange} required />
      <input name="bankName" placeholder="Bank Name" value={bank.bankName} onChange={handleChange} required />
      <input name="accountNumber" placeholder="Account Number" value={bank.accountNumber} onChange={handleChange} required />
      <input name="accountHolderName" placeholder="Account Holder Name" value={bank.accountHolderName} onChange={handleChange} required />
      <button type="submit">Add Bank</button>
    </form>
  );
};

export default BankForm;
