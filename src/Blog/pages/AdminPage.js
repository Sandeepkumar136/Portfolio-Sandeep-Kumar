// src/pages/AdminPage.js
import React, { useEffect, useState } from "react";
import { LoginForm, LogoutButton, useCurrentUser } from "../Auth";
import BlogForm from "../BlogFom";
import { databases, DB_ID, COLLECTION_ID } from "../lib/appwrite";
import Loader from "../../utils/Loader";
import { UseAlert } from "../../utils/AlertBox";

export default function AdminPage() {
  const { user, ready, setUser } = useCurrentUser();
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [err, setErr] = useState("");
  const [confirmDoc, setConfirmDoc] = useState(null); // track which doc to delete
  const { OpenAlertBox, CloseAlertBox, isAlertBoxOpen } = UseAlert();

  async function load() {
    setErr("");
    try {
      const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
      const docs = (res.documents || []).sort((a, b) =>
        String(b.$createdAt || "").localeCompare(String(a.$createdAt || ""))
      );
      setList(docs);
    } catch (e) {
      setErr(e?.message || "Load failed");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
      await load();
    } catch (e) {
      alert(e?.message || "Delete failed");
    }
  }

  const openDeleteConfirm = (doc) => {
    setConfirmDoc(doc);
    OpenAlertBox();
  };

  const cancelDelete = () => {
    setConfirmDoc(null);
    CloseAlertBox();
  };

  const confirmDelete = async () => {
    if (!confirmDoc) return;
    await handleDelete(confirmDoc.$id);
    setConfirmDoc(null);
    CloseAlertBox();
  };

  return (
    <div>
      {!ready ? <Loader /> : null}
      {ready && !user ? <LoginForm onAuth={(me) => setUser(me)} /> : null}

      {ready && user ? (
        <>
          <div className="ad-header-cop">
            <div className="ad-em-cop">Logged in as {user.email}</div>
            <LogoutButton onLogout={() => window.location.reload()} />
          </div>

          <h3 className="heading-f-main" style={{ marginTop: 16 }}>
            {editing ? "Edit blog" : "Add new blog"}
          </h3>

          <BlogForm
            me={user}
            editingDoc={editing}
            onSaved={() => {
              setEditing(null);
              load();
            }}
            onCancel={() => setEditing(null)}
          />

          <div className="bl-sh-contain">
            <h3 className="bl-sh-m-head">All blogs</h3>

            {err && (
              <div className="err" style={{ color: "red" }}>
                {err}
              </div>
            )}

            <div className="bl-sh-c-contain">
              {list.map((doc) => (
                <div className="bl-sh-m-c" key={doc.$id}>
                  <div className="bl-sh-up-contain">
                    <div className="bl-sh-h-contain">
                      <div className="bl-sh-c-head">{doc.heading}</div>
                      <div className="bl-sh-c-t">
                        {new Date(doc.$createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="bl-sh-btn-contain">
                      <button onClick={() => setEditing(doc)}>
                        <i className="bx bx-edit"></i>
                      </button>
                      <button onClick={() => openDeleteConfirm(doc)}>
                        <i className="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div className="bl-sh-t">{doc.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Single global alert, shown once, driven by confirmDoc */}
          {isAlertBoxOpen && confirmDoc && (
            <div className="b-al-container">
              <div className="b-al-contain">
                <h5 className="b-al-text">
                  Deletion Confirmation of
                </h5>
                <h6 className="b-al-subtext">{confirmDoc.heading}</h6>
                <div className="b-al-btn-contain">
                  <button
                    onClick={cancelDelete}
                    type="button"
                    className="btn-al"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    type="button"
                    className="btn-al"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
