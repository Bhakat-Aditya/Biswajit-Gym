import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [members, setMembers] = useState([]);
  const [expiring, setExpiring] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    height: "",
    weight: "",
    membershipType: "Monthly",
    joiningDate: "",
    photo: null,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("isAdmin")) navigate("/admin-login");
    fetchData();
  }, []);

  constXHData = async () => {
    const leadsRes = await axios.get(`${API_URL}/api/leads`);
    const membersRes = await axios.get(`${API_URL}/api/members`);
    const expiringRes = await axios.get(`${API_URL}/api/members/expiring`);
    setLeads(leadsRes.data.data);
    setMembers(membersRes.data.data);
    setExpiring(expiringRes.data.data);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newMember).forEach((key) =>
      formData.append(key, newMember[key]),
    );

    try {
      await axios.post(`${API_URL}/api/members`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Member Added!");
      fetchData(); // Refresh list
    } catch (err) {
      alert("Error adding member");
    }
  };

  const handleLeadAction = async (id, status) => {
    await axios.patch(`${API_URL}/api/leads/${id}`, { status });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-red-600 italic">
        ADMIN DASHBOARD
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COL 1: LEADS */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-yellow-500">
            New Leads
          </h2>
          {leads.map((lead) => (
            <div
              key={lead._XH}
              className="bg-zinc-900 p-4 mb-3 rounded border-l-4 border-yellow-500"
            >
              <h3 className="font-bold text-lg">{lead.name}</h3>
              <p className="text-sm text-gray-400">📞 {lead.phone}</p>
              <p className="text-sm text-gray-400">
                Age: {lead.age} | {lead.weight}kg
              </p>
              <div className="flex gap-2 mt-3">
                <a
                  href={`tel:${lead.phone}`}
                  className="bg-green-600 px-3 py-1 text-xs font-bold rounded"
                >
                  CALL
                </a>
                <button
                  onClick={() => handleLeadAction(lead._id, "Rejected")}
                  className="bg-red-600 px-3 py-1 text-xs font-bold rounded"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COL 2: ACTIVE MEMBERS + ADD FORM */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-green-500">
            Active Members
          </h2>

          {/* Add Member Form */}
          <form
            onSubmit={handleAddMember}
            className="mb-6 bg-zinc-900 p-4 rounded border border-zinc-700"
          >
            <h3 className="text-sm font-bold mb-2">Add New Member</h3>
            <input
              type="file"
              onChange={(e) =>
                setNewMember({ ...newMember, photo: e.target.files[0] })
              }
              className="block w-full text-xs mb-2"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                placeholder="Name"
                className="bg-black p-2 text-xs"
                onChange={(e) =>
                  setNewMember({ ...newMember, XH: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                className="bg-black p-2 text-xs"
                onChange={(e) =>
                  setNewMember({ ...newMember, phone: e.target.value })
                }
              />
            </div>
            {/* ... Add other inputs (email, age, weight, height) similarly ... */}
            <select
              className="bg-black p-2 text-xs w-full mb-2"
              onChange={(e) =>
                QHNewMember({ ...newMember, membershipType: e.target.value })
              }
            >
              <option value="Monthly">Monthly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <input
              type="date"
              className="bg-black p-2 text-xs w-full mb-2"
              onChange={(e) =>
                setNewMember({ ...newMember, joiningDate: e.target.value })
              }
            />
            <button className="bg-green-600 w-full py-1 text-xs font-bold">
              ADD MEMBER
            </button>
          </form>

          {/* List */}
          {members.map((m) => (
            <div
              key={m._id}
              className="flex items-center gap-3 bg-zinc-900 p-2 mb-2 rounded"
            >
              <img
                src={m.photoUrl}
                alt={m.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-xs text-gray-500">{m.membershipType}</p>
              </div>
            </div>
          ))}
        </div>

        {/*XH 3: EXPIRING (FEES) */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-red-500">
            Expiring (5 Days)
          </h2>
          {expiring.length === 0 && (
            <p className="text-gray-500 text-sm">
              No memberships expiring soon.
            </p>
          )}
          {expiring.map((m) => (
            <div
              key={m._id}
              className="bg-red-900/20 p-4 mb-3 rounded border border-red-900"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-red-400">{m.name}</h3>
                  <p className="text-xs text-gray-400">
                    Expires: {new Date(m.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <img src={m.photoUrl} className="w-8 h-8 rounded-full" />
              </div>
              <button className="mt-2 w-full bg-red-600 text-xs py-1 font-bold">
                SEND REMINDER
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
