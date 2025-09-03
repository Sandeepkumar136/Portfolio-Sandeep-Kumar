import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteUser } from "firebase/auth";
import ChangePassword from "./ChangePassword"; // your component

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        let data = docSnap.exists() ? docSnap.data() : {};
        data.email = user.email;
        data.firstName = data.firstName || user.displayName || "User";
        data.photo = user.photoURL || data.photo || "";

        setUserDetails(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      toast.success("Account deleted");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  const isGoogleUser = auth.currentUser?.providerData?.some(
    (p) => p.providerId === "google.com"
  );

  return (
    <div className="text-center">
      {userDetails?.photo ? (
        <img
          src={userDetails.photo}
          alt="Profile"
          width="120"
          height="120"
          style={{ borderRadius: "50%", objectFit: "cover" }}
          referrerPolicy="no-referrer"
        />
      ) : (
        <i
          className="bx bx-user-circle"
          style={{ fontSize: "120px", color: "#6c757d" }}
        >logo</i>
      )}

      <h3 className="mt-3">Welcome {userDetails?.firstName} 🙏🙏</h3>
      <p>Email: {userDetails?.email}</p>

      {/* Only show Change Password button for manual users */}
      {!isGoogleUser && !showChangePassword && (
        <button
          className="btn btn-warning mt-3"
          onClick={() => setShowChangePassword(true)}
        >
          Change Password
        </button>
      )}

      {/* Show the ChangePassword component only when button is clicked */}
      {showChangePassword && <ChangePassword />}

      <div className="mt-3">
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <button className="btn btn-secondary mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
