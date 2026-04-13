import { useCallback, useEffect, useState } from "react";
import { getContacts, searchContacts, updateContact,deleteContact } from "../services/api";
import ContactCard from "../components/ContactCard";
import "../css/all.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
      setError(null);
    } catch (error) {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchContacts(searchQuery);
      setContacts(searchResults);
      setError(null);
    } catch (error) {
      setContacts([]);
      setError("Failed to search contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const updated = await updateContact(id, updatedData);
      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (err) {
      setError("Failed to update contact");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") loadContacts();
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="contacts-grid">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <div className="no-results">No contacts found.</div>
          )}
        </div>
      )}
      <button className="addContact" onClick={() => {navigate("/add")}}>
        +
      </button>
    </div>
  );
}

export default Home;