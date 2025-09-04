// src/components/ChangePassword.jsx
import React, { useMemo, useState } from "react";
import { auth } from "./firebaseConfig"; // adjust if needed
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const isGoogleUser = useMemo(
    () => !!auth.currentUser?.providerData?.some(p => p.providerId === "google.com"),
    []
  );

  if (isGoogleUser) {
    return (
      <p style={{ color: "#6c757d" }}>
        Password changes are managed by the Google provider account linked here.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser?.email) {
      alert("No authenticated user found.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const cred = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      if (err?.code === "auth/wrong-password") {
        alert("Current password is incorrect.");
      } else if (err?.code === "auth/weak-password") {
        alert("New password is too weak.");
      } else {
        alert(err?.message || "Failed to update password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "0 auto" }}>
      <h4>Change Password</h4>
      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          className="form-control"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-2">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div className="form-group mt-2">
        <label>Confirm New Password</label>
        <input
          type="password"
          className="form-control"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ChangePassword;
