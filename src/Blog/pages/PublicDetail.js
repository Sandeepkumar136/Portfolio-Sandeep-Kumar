// src/pages/PublicDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { databases, DB_ID, COLLECTION_ID } from '../lib/appwrite';
import { renderSection } from '../utils/Section';

export default function PublicDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    databases.getDocument(DB_ID, COLLECTION_ID, id)
      .then(d => { if (mounted) setDoc(d); })
      .catch(e => setErr(e?.message || 'Not found'));
    return () => { mounted = false; };
  }, [id]);

  const sections = doc?.sectionsJson ? (() => { try { return JSON.parse(doc.sectionsJson); } catch { return []; } })() : [];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <Link to="/">← Back</Link>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      {!doc ? <div>Loading...</div> : (
        <>
          <h1>{doc.heading}</h1>
          <h3 style={{ color: '#555' }}>{doc.subtitle}</h3>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
            {doc.$createdAt ? new Date(doc.$createdAt).toLocaleString() : ''}
          </div>
          <div>
            {sections.map((s, i) => renderSection(s, i))}
          </div>
        </>
      )}
    </div>
  );
}
