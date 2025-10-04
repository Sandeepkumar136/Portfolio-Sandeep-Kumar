// src/pages/PublicList.js
import React, { useEffect, useState } from 'react';
import { databases, DB_ID, COLLECTION_ID } from '../lib/appwrite';
import { Link } from 'react-router-dom';

function PublicList() {
  const [list, setList] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    databases.listDocuments(DB_ID, COLLECTION_ID)
      .then(res => {
        if (!mounted) return;
        const docs = (res.documents || []).sort((a, b) =>
          String(b.$createdAt || '').localeCompare(String(a.$createdAt || ''))
        );
        setList(docs);
      })
      .catch(e => setErr(e?.message || 'Failed to load'));
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Blog</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div style={{ display: 'grid', gap: 8 }}>
        {list.map(doc => (
          <Link key={doc.$id} to={`/blog/${doc.$id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{doc.heading}</div>
              <div style={{ color: '#555' }}>{doc.subtitle}</div>
              <div style={{ fontSize: 12, color: '#888' }}>
                {doc.$createdAt ? new Date(doc.$createdAt).toLocaleString() : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default PublicList;
