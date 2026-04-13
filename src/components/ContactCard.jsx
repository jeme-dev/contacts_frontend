import React, { useState, useEffect } from "react";
import { deleteContact } from "../services/api";

function ContactCard({ contact, onUpdate }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [formData, setFormData] = useState({ ...contact });
  const [deletedContact , setDeletedContact] = useState(true)
  useEffect(() => {
    setFormData({ ...contact });
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving contact with data:", formData);
    onUpdate(contact._id, formData);
    setUpdateMode(false);
  };

const handleDelete = () => {
  if (window.confirm("Are you sure?")) {
    deleteContact(contact._id); 
    setDeletedContact(false)
  }
};

  const handleCancel = () => {
    setFormData({ ...contact });
    setUpdateMode(false);
  };
  if (!deletedContact) return null; 
  return (
    <div className="contact-card">
      {updateMode ? (
        <div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="nameInput"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="emailInput"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="phoneInput"
          />
        </div>
      ) : (
        <>
          <h3 className="name">{contact.name}</h3>
          <p className="email">{contact.email}</p>
          <p className="phone">{contact.phone}</p>
        </>
      )}

      <button
        onClick={updateMode ? handleCancel : () => setUpdateMode(true)}
        className={`cardButton ${updateMode ? "backRed" : "backBlue"}`}
      >
        {updateMode ? "Cancel" : "Update"}
      </button>

      { (
        <button className={`cardButton ${updateMode ? "backBlue" : "backRed"} saveButton`} onClick={updateMode ? handleSave : handleDelete }>
          {updateMode ? "Save" : "delete"}
        </button>
      )}
    </div>
  );
}

export default ContactCard;
