import React, { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { toast } from "react-toastify";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword) {
      toast.error("Enter a new password");
      return;
    }

    if (!auth.currentUser) {
      toast.error("No logged-in user found");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully");
      setNewPassword("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <input
        type="password"
        placeholder="Enter new password"
        className="form-control mb-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        className="btn btn-warning"
        onClick={handleChangePassword}
        disabled={loading}
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}

export default ChangePassword;
