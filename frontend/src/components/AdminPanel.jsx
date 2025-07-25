import { useEffect, useState } from "react";
import API from "../services/api";

const AdminPanel = () => {
  const [banks, setBanks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllBanks = async () => {
    const res = await API.get("/banks/all");
    setBanks(res.data);
  };

  useEffect(() => {
    fetchAllBanks();
  }, []);

  const filtered = banks.filter(b =>
    b.user.username.toLowerCase().includes(search.toLowerCase()) ||
    b.bankName.toLowerCase().includes(search.toLowerCase()) ||
    b.ifscCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Panel - All Bank Info</h2>
      <input placeholder="Search by username, bank, IFSC" value={search} onChange={(e) => setSearch(e.target.value)} />
      {filtered.map((b) => (
        <div key={b._id}>
          <p>{b.user.username} - {b.bankName} ({b.ifscCode})</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
