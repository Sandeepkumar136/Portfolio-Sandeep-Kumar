import React, { useState } from "react";
import { updatePassword } from "firebase/auth"; // only import updatePassword
import { auth } from "./firebase"; // import your firebase auth instance
import { toast } from "react-toastify";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!newPassword) {
      toast.error("Enter a new password");
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully");
      setNewPassword("");
    } catch (error) {
      toast.error(error.message);
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
      <button className="btn btn-warning" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;
