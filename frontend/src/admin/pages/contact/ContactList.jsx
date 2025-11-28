import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts
  const getContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact`);
      setContacts(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load contacts");
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;
    try {
      await axios.delete(`${API_URL}/contact/delete/${id}`);
      toast.success("Contact deleted successfully!");
      getContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="w-full mx-auto p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contact </h1>
      </div>

      <table className="w-full  mt-15">
        <thead className="bg-gray-100 uppercase">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Message</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <tr key={c._id} className="border-t text-center">
                <td className="p-2 font-medium">{c.name}</td>
                <td className="p-2 text-blue-600 underline">{c.email}</td>
                <td className="p-2">{c.message}</td>
                <td className="p-2 text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => deleteContact(c._id)}
                    className="bbg-red-500 text-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-6 text-gray-600 text-lg">
                No contacts found 😕
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
