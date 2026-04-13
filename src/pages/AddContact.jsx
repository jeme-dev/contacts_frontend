import React, { useState } from "react";
import "../css/all.css";
import { addContact } from "../services/api";
import { useNavigate } from "react-router-dom";
function AddContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(formData);
      // navigate("/");
    } catch (err) {
      console.error("Failed to add contact:", err);
    }
  };
  return (
    <form action="" className="addContactForm">
      <h2>Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="addContactName"
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="addContactEmail"
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="addContactPhone"
      />
      <button type="submit" onClick={handleSubmit} className="backBlue">
        Add Contact
      </button>
      <button
        type="clear"
        className="backRed"
        onClick={() => setFormData({ name: "", email: "", phone: "" })}
      >
        Clear
      </button>
      <button
        type="button"
        className="backRed"
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel
      </button>
    </form>
  );
}

export default AddContact;
