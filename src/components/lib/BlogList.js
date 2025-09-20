// src/components/lib/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { databases, Query, cfg } from '../../appwrite';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    databases
      .listDocuments(cfg.databaseId, cfg.collectionId, [Query.orderDesc('$createdAt')])
      .then(res => setItems(res.documents))
      .finally(()=>setLoading(false));
  },[]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Blog</h2>
      <ul>
        {items.map(doc => (
          <li key={doc.$id} style={{ marginBottom: 12 }}>
            <Link to={`/post/${doc.$id}`}>
              <div style={{ fontSize: 18 }}>{doc.heading}</div>
              <div style={{ color: '#555' }}>{doc.subtitle}</div>
              <div style={{ fontSize: 12, color: '#999' }}>
                {new Date(doc.$createdAt).toLocaleDateString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
