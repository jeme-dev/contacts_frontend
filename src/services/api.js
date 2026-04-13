const BASE_URL = import.meta.env.VITE_BASE_URL;
import { getValidToken } from "./auth"; // ✅ Only import, don't redefine below

const getAuthHeaders = () => {
  const token = getValidToken();
  if (!token) {
    throw new Error("Session expired");
  }
  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getContacts = async () => {
  const response = await fetch(`${BASE_URL}/api/contacts/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch contacts");
  return response.json();
};

export const searchContacts = async (query) => {
  const response = await fetch(
    `${BASE_URL}/api/contacts/${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    },
  );
  if (!response.ok) throw new Error("Search failed");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error("Registration failed");

  return loginUser(email, password);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();
  localStorage.setItem("token", data.accessToken || data.token);
  return data;
};

export const updateContact = async (id, updatedData) => {
  const { _id, user_id, __v, ...cleanData } = updatedData;

  const response = await fetch(`${BASE_URL}/api/contacts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update contact");
  }
  return response.json();
};
export const deleteContact = async (id) => {
  const response = await fetch(`${BASE_URL}/api/contacts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete contact");
  }
  return response.json();
};
export const addContact = async (contactData) => {
  const response = await fetch(`${BASE_URL}/api/contacts/`, {
    method:"POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(contactData)
  })
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add contact");
  }
  return response.json();
}