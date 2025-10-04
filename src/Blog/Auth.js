// src/components/Auth.js
import React, { useEffect, useState } from "react";
import { account } from "./lib/appwrite";
import Image_Exported from "../components/assets/ImageExporter";

export function LoginForm({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    try {
      await account.createEmailPasswordSession({ email, password });
      const me = await account.get();
      onAuth?.(me);
    } catch (error) {
      setErr(error?.message || "Login failed");
    }
  }

  return (
    <>
    <div className="b-inp-container">
      <div className="b-inp-form-container">
        <img
          src={Image_Exported["blog-input"]}
          alt="Placeholder"
          className="b-inp-img"
        />
        <form onSubmit={handleLogin} style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {err && (
            <div className="err" style={{ color: "red" }}>
              {err}
            </div>
          )}
        </form>
      </div>
      </div>
      <div className="b-inp-not-container">
        <h3 className="heading-b-inp-not">Discliamer</h3>
        <p className="b-inp-not">
          This admin page is restricted to site administrators and authorized
          developers only. Unauthorized access is prohibited and may result in
          legal action. If you require an admin user ID or password, contact the
          site administrator directly. Sharing credentials is forbidden;
          maintain security best practices and log out after each session.
        </p>
        <p className="b-inp-not">
          This blogs is for educational purposes only. The content and views
          expressed here are solely those of the author and do not reflect the
          views of any organization or entity. The information provided is not
          intended to be a substitute for professional advice. Always seek the
          advice of a qualified professional with any questions you may have
          regarding a specific topic.
        </p>
    </div>
    </>
  );
}

export function LogoutButton({ onLogout }) {
  async function handleLogout() {
    try {
      await account.deleteSession("current");
    } finally {
      onLogout?.();
    }
  }
  return <button className="ad-btn-cop" onClick={handleLogout}>Logout</button>;
}

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    account.get().then(
      (u) => {
        if (mounted) {
          setUser(u);
          setReady(true);
        }
      },
      () => {
        if (mounted) {
          setUser(null);
          setReady(true);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);
  return { user, ready, setUser };
}
