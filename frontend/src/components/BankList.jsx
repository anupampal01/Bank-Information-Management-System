import { useState } from "react";
import API from "../services/api";

const BankList = ({ banks, fetchBanks }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  // Delete bank
  const deleteBank = async (id) => {
    if (window.confirm("Delete this bank info?")) {
      await API.delete(`/banks/${id}`);
      fetchBanks();
    }
  };

  // Start edit mode
  const startEdit = (bank) => {
    setEditId(bank._id);
    setEditData({
      ifscCode: bank.ifscCode,
      branchName: bank.branchName,
      bankName: bank.bankName,
      accountNumber: bank.accountNumber,
      accountHolderName: bank.accountHolderName,
    });
  };

  // Handle form input
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save edited bank info
  const saveEdit = async (id) => {
    try {
      await API.put(`/banks/${id}`, editData);
      setEditId(null);
      fetchBanks();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating bank info");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div>
      <h3>Your Bank Accounts</h3>
      {banks.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          {editId === b._id ? (
            // Edit form
            <div>
              <input
                name="ifscCode"
                value={editData.ifscCode}
                onChange={handleChange}
                placeholder="IFSC Code"
              />
              <input
                name="branchName"
                value={editData.branchName}
                onChange={handleChange}
                placeholder="Branch Name"
              />
              <input
                name="bankName"
                value={editData.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
              />
              <input
                name="accountNumber"
                value={editData.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
              />
              <input
                name="accountHolderName"
                value={editData.accountHolderName}
                onChange={handleChange}
                placeholder="Account Holder Name"
              />
              <button onClick={() => saveEdit(b._id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            // Display mode
            <div>
              <p>
                <strong>{b.bankName}</strong> - {b.accountNumber}
              </p>
              <p>IFSC: {b.ifscCode} | Branch: {b.branchName}</p>
              <p>Holder: {b.accountHolderName}</p>
              <button onClick={() => startEdit(b)}>Edit</button>
              <button onClick={() => deleteBank(b._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BankList;
