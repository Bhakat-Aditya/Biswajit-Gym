import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [members, setMembers] = useState([]);
  const [expiring, setExpiring] = useState([]);

  // Search & Modal State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

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
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  // Fetch gallery photos when modal opens
  const openGallery = async () => {
    setShowGalleryModal(true);
    const res = await axios.get(`${API_URL}/api/gallery`);
    setGalleryPhotos(res.data.data);
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      alert("Uploading... Please wait.");
      await axios.post(`${API_URL}/api/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded!");
      const res = await axios.get(`${API_URL}/api/gallery`);
      setGalleryPhotos(res.data.data);
    } catch (err) {
      alert("Upload failed.");
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!confirm("Are you sure?")) return;
    await axios.delete(`${API_URL}/api/gallery/${id}`);
    setGalleryPhotos(galleryPhotos.filter((p) => p._id !== id));
  };

  useEffect(() => {
    if (!sessionStorage.getItem("isAdmin")) navigate("/admin-login");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const leadsRes = await axios.get(`${API_URL}/api/leads`);
      const membersRes = await axios.get(`${API_URL}/api/members`);
      const expiringRes = await axios.get(`${API_URL}/api/members/expiring`);
      setLeads(leadsRes.data.data);
      setMembers(membersRes.data.data);
      setExpiring(expiringRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      fetchData();
      setNewMember({
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
    } catch (err) {
      alert("Error adding member. Check console.");
      console.error(err);
    }
  };

  const handleLeadAction = async (id, status) => {
    await axios.patch(`${API_URL}/api/leads/${id}`, { status });
    fetchData();
  };

  // --- Logic for Search & Days Left ---
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm),
  );

  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8 relative">
      {/* --- MEMBER ID CARD MODAL --- */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Header / Banner */}
            <div className="h-24 bg-gradient-to-r from-red-900 to-black relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-6 -mt-12">
              <div className="flex justify-between items-end">
                <img
                  src={selectedMember.photoUrl}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-full border-4 border-zinc-900 object-cover bg-zinc-800"
                />
                <div className="text-right mb-2">
                  {/* Days Left Badge */}
                  <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-2 text-center">
                    <span className="block text-xs text-gray-400 uppercase tracking-wider">
                      Time Left
                    </span>
                    <span
                      className={`text-xl font-black ${getDaysLeft(selectedMember.expiryDate) < 5 ? "text-red-500" : "text-green-500"}`}
                    >
                      {getDaysLeft(selectedMember.expiryDate)} DAYS
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl font-bold text-white uppercase">
                  {selectedMember.name}
                </h2>
                <p className="text-red-500 font-bold text-sm tracking-widest">
                  {selectedMember.membershipType.toUpperCase()} MEMBER
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Phone</p>
                    <p className="font-mono text-white">
                      {selectedMember.phone}
                    </p>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="truncate text-white">
                      {selectedMember.email}
                    </p>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Physical Stats</p>
                    <p className="text-white">
                      {selectedMember.height}cm / {selectedMember.weight}kg
                    </p>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Age</p>
                    <p className="text-white">{selectedMember.age} Years</p>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Joined</p>
                    <p className="text-white">
                      {new Date(
                        selectedMember.joiningDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-zinc-800">
                    <p className="text-gray-500 text-xs">Expires</p>
                    <p className="text-red-400">
                      {new Date(selectedMember.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <a
                    href={`tel:${selectedMember.phone}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold text-center uppercase text-sm"
                  >
                    Call Member
                  </a>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded font-bold text-center uppercase text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- END MODAL --- */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">ADMIN DASHBOARD</h1>

        <div className="flex gap-4">
          <button
            onClick={openGallery}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded font-bold text-sm border border-zinc-600"
          >
            📸 MANAGE GALLERY
          </button>

          <button
            onClick={() => {
              sessionStorage.removeItem("isAdmin");
              navigate("/");
            }}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COL 1: LEADS */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-yellow-500">
            New Leads
          </h2>
          {leads.length === 0 && (
            <p className="text-gray-600 text-sm">No new leads.</p>
          )}
          {leads.map((lead) => (
            <div
              key={lead._id}
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
                  className="bg-green-600 px-3 py-1 text-xs font-bold rounded hover:bg-green-700"
                >
                  CALL
                </a>
                <button
                  onClick={() => handleLeadAction(lead._id, "Rejected")}
                  className="bg-red-600 px-3 py-1 text-xs font-bold rounded hover:bg-red-700"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COL 2: ACTIVE MEMBERS */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-green-500">
            Active Members
          </h2>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="🔍 Search by Name or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded mb-4 focus:border-green-500 outline-none transition-colors text-sm"
          />

          {/* ADD MEMBER FORM (Collapsible or Standard) */}
          <details className="mb-4 group">
            <summary className="cursor-pointer bg-zinc-900 p-3 rounded border border-zinc-700 font-bold text-sm flex justify-between items-center">
              <span>+ Register New Member</span>
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <form
              onSubmit={handleAddMember}
              className="mt-2 bg-zinc-900 p-4 rounded border border-zinc-700 space-y-2"
            >
              <input
                type="file"
                required
                onChange={(e) =>
                  setNewMember({ ...newMember, photo: e.target.files[0] })
                }
                className="block w-full text-xs text-gray-400 file:bg-zinc-800 file:text-white file:border-0 file:px-2 file:py-1"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Name"
                  required
                  value={newMember.name}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
                <input
                  placeholder="Phone"
                  required
                  value={newMember.phone}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Email"
                  type="email"
                  required
                  value={newMember.email}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
                <input
                  placeholder="Age"
                  type="number"
                  required
                  value={newMember.age}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, age: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Height (cm)"
                  type="number"
                  value={newMember.height}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, height: e.target.value })
                  }
                />
                <input
                  placeholder="Weight (kg)"
                  type="number"
                  value={newMember.weight}
                  className="bg-black p-2 text-xs text-white border border-zinc-700 rounded"
                  onChange={(e) =>
                    setNewMember({ ...newMember, weight: e.target.value })
                  }
                />
              </div>
              <select
                className="bg-black p-2 text-xs w-full text-white border border-zinc-700 rounded"
                value={newMember.membershipType}
                onChange={(e) =>
                  setNewMember({ ...newMember, membershipType: e.target.value })
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <input
                type="date"
                required
                value={newMember.joiningDate}
                className="bg-black p-2 text-xs w-full text-white border border-zinc-700 rounded"
                onChange={(e) =>
                  setNewMember({ ...newMember, joiningDate: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-green-600 w-full py-2 text-xs font-bold rounded hover:bg-green-700"
              >
                ADD MEMBER
              </button>
            </form>
          </details>

          {/* MEMBER LIST */}
          <div className="space-y-2">
            {filteredMembers.map((m) => (
              <div
                key={m._id}
                onClick={() => setSelectedMember(m)} // Opens Modal
                className="flex items-center gap-3 bg-zinc-900 p-3 rounded hover:bg-zinc-800 cursor-pointer border border-transparent hover:border-zinc-700 transition-all"
              >
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-600"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm text-white">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-gray-300">
                    {m.membershipType}
                  </span>
                </div>
              </div>
            ))}
            {filteredMembers.length === 0 && (
              <p className="text-center text-gray-600 text-sm mt-4">
                No members found.
              </p>
            )}
          </div>
        </div>

        {/* COL 3: EXPIRING (FEES) */}
        <div className="bg-black p-4 rounded-lg border border-zinc-800 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-2 text-red-500">
            Expiring Soon
          </h2>
          {expiring.length === 0 && (
            <p className="text-gray-600 text-sm">
              No memberships expiring in 5 days.
            </p>
          )}
          {expiring.map((m) => (
            <div
              key={m._id}
              className="bg-red-900/10 p-4 mb-3 rounded border border-red-900/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-red-400">{m.name}</h3>
                  <p className="text-xs text-gray-400">
                    Expires: {new Date(m.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <img
                  src={m.photoUrl}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <button className="mt-2 w-full bg-red-600 text-white text-xs py-1 font-bold rounded hover:bg-red-700">
                SEND REMINDER
              </button>
            </div>
          ))}
        </div>
      </div>
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-4xl h-[80vh] rounded-2xl flex flex-col relative overflow-hidden">
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center bg-black">
              <h2 className="text-xl font-bold text-white">Gallery Manager</h2>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="text-gray-500 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-zinc-800 border-b border-zinc-700">
              <label className="flex items-center gap-4 cursor-pointer">
                <span className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-sm">
                  + UPLOAD NEW PHOTO
                </span>
                <input
                  type="file"
                  onChange={handleUploadPhoto}
                  className="hidden"
                  accept="image/*"
                />
                <span className="text-xs text-gray-400">
                  Select an image to upload instantly.
                </span>
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="relative group border border-zinc-700 rounded overflow-hidden"
                  >
                    <img
                      src={photo.photoUrl}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        onClick={() => handleDeletePhoto(photo._id)}
                        className="bg-red-600 text-white px-3 py-1 text-xs rounded font-bold"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
