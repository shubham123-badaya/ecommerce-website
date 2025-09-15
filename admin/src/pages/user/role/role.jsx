import React, { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../../../src/config";
// import { PlusCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Role = () => {
  // State for the list
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the "Add Role" modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState(null);

  // State for the "Delete Role" confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Use useCallback to memoize the fetch function
  const fetchRoles = useCallback(async () => {
    // setLoading(true); // Optional: show loader on refresh
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/rolesList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Not authorized to view this page.");
        }
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]); // Depend on the memoized fetchRoles function

  // Handler function for submitting the new role
  const handleAddRole = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAddError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(`${API_URL}/addRole`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newRoleName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the new role.");
      }

      toast.success("Role added"); // ✅ Toast on success

      setIsModalOpen(false);
      setNewRoleName("");
      await fetchRoles(); // Refresh the roles list
    } catch (err) {
      setAddError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler functions for deleting a role
  const handleOpenDeleteModal = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
    setDeleteError(null); // Clear previous errors
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(
        `${API_URL}/roleDelete/${roleToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to delete the role." }));
        throw new Error(errorData.message);
      }

      toast.success("Role deleted"); // ✅ show toast after successful delete

      handleCloseDeleteModal();
      await fetchRoles(); // Refresh role list
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-white p-4">Loading roles...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-[#d9e0e8] text-gray-800 dark:bg-neutral-900 dark:text-white h-screen p-6 rounded-xl shadow-md mx-auto container text-sm">
        <div className="flex justify-between items-center">
          <h2 className=" text-2xl mb-4 font-bold">Manage Roles</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-900 text-white px-3 rounded-md hover:rounded-xl hover:bg-blue-600 duration-300 h-10"
          >
            Add Role
          </button>
        </div>
        <div className="hidden rounded-2xl md:block overflow-x-auto mt-10">
          <table className="w-full   bg-gray-100/90 dark:bg-neutral-900   text-left">
            <thead className="bg-neutral-800/80   uppercase  text-gray-300">
              <tr className="text-left text-sm   font-semibold  ">
                <th className="p-3 text-white">S. No.</th>
                <th className="p-3 text-white">Role Name</th>
                <th className="p-3 text-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <tr
                    key={role._id}
                    className="border-t border-gray-700 hover:bg-neutral-800/70 "
                  >
                    <td className="p-3 ">{index + 1}</td>
                    <td className="p-3 ">{role.name}</td>
                    <td className="p-3  text-center">
                      {/* MODIFIED: Conditionally render the delete button */}
                      {role.name.toLowerCase() !== "admin" && (
                        <button
                          onClick={() => handleOpenDeleteModal(role)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Delete Role"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-neutral-400">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Role Modal */}
      {/* Add Role Modal - Refined Design */}
      {isModalOpen && (
        // ADDED: Simple fade-in animation to the backdrop
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
          {/* MODIFIED: Added gradient, border, shadow, and entrance animation */}
          <div
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-xl shadow-2xl w-full max-w-md ring-1 ring-white/10
                    transform transition-all duration-300 opacity-100 scale-100"
          >
            {/* MODIFIED: Added an icon and improved typography */}
            <div className="flex items-center space-x-3 mb-6">
              {/* <PlusCircleIcon className="w-8 h-8 text-blue-400" /> */}
              <h3 className="text-white text-xl font-bold">Add a New Role</h3>
            </div>

            <form onSubmit={handleAddRole}>
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
                // MODIFIED: Enhanced input styling with better focus state
                className="w-full bg-neutral-700/50 text-white p-3 rounded-lg border border-neutral-700 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none transition mb-4"
                required
              />
              {addError && (
                <p className="text-red-500 text-sm mb-4">{addError}</p>
              )}
              <div className="flex justify-end space-x-4 ">
                {/* MODIFIED: "Ghost" button style for less emphasis */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className=" text-neutral-400 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-700/40 transition-colors"
                >
                  Cancel
                </button>
                {/* MODIFIED: More prominent style with shadow on hover */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg disabled:bg-blue-500/50 
                       disabled:cursor-not-allowed hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:shadow-blue-600/20"
                >
                  {isSubmitting ? "Adding..." : "Add Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Role Modal */}
      {isDeleteModalOpen && roleToDelete && (
        <div className="fixed inset-0 bg-black/10  backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-white text-lg font-bold mb-4">
              Confirm Deletion
            </h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete the role:{" "}
              <strong className="text-white">"{roleToDelete.name}"</strong>?
              This action cannot be undone.
            </p>
            {deleteError && (
              <p className="text-red-500 text-sm mb-4">{deleteError}</p>
            )}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="bg-neutral-600 text-white px-4 py-2 rounded hover:bg-neutral-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteRole}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-red-500 disabled:cursor-not-allowed hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Role;
//authentication
//authrization
//
