import React, { useEffect, useState } from "react";
import { auth, authDb } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteUser } from "firebase/auth";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(authDb, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          let data = docSnap.exists() ? docSnap.data() : {};
          setUserDetails({
            email: user.email,
            firstName: data.firstName || user.displayName || "User",
            photo: user.photoURL || data.photo || "",
          });
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      } else {
        navigate("/login"); // redirect if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      toast.success("Account deleted");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  const isGoogleUser = auth.currentUser?.providerData?.some(p => p.providerId === "google.com");

  return (
    <div className="text-center">
      {userDetails?.photo ? (
        <img src={userDetails.photo} alt="Profile" width="120" height="120" style={{ borderRadius: "50%", objectFit: "cover" }} referrerPolicy="no-referrer" />
      ) : (
        <i className="bx bx-user-circle" style={{ fontSize: "120px", color: "#6c757d" }}></i>
      )}
      <h3 className="mt-3">Welcome {userDetails?.firstName} 🙏🙏</h3>
      <p>Email: {userDetails?.email}</p>

      {!isGoogleUser && !showChangePassword && (
        <button className="btn btn-warning mt-3" onClick={() => setShowChangePassword(true)}>
          Change Password
        </button>
      )}

      {showChangePassword && <ChangePassword />}

      <div className="mt-3">
        <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
      </div>

      <button className="btn btn-secondary mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
