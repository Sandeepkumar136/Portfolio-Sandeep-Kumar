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
    <div>
      {err && <div className='err' style={{ color: 'red' }}>{err}</div>}
      <div className='bl-l-container'>
        {list.map(doc => (
          <Link key={doc.$id} to={`/blog/${doc.$id}`} className='bl-l-contain'>
            <div className='bl-l-m-c' >
              <div className='bl-l-m-head'>{doc.heading.split(' ').slice(0, 5).join(' ')}...</div>
              <div className='bl-l-m-d'>
                {doc.$createdAt ? new Date(doc.$createdAt).toLocaleString() : ''}
              </div>
              <div className='bl-l-m-s'>{doc.subtitle.split(' ').slice(0, 10).join(' ')}...</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default PublicList;
