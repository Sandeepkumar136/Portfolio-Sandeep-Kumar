// src/components/lib/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { databases, cfg } from '../../appwrite';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(()=>{
    if (!id) return;
    databases.getDocument(cfg.databaseId, cfg.collectionId, id).then(setDoc);
  },[id]);

  if (!doc) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <Link to="/">← Back</Link>
      <h1>{doc.heading}</h1>
      <h3 style={{ color: '#555' }}>{doc.subtitle}</h3>
      <div style={{ fontSize: 12, color: '#999' }}>
        {new Date(doc.$createdAt).toLocaleString()}
      </div>

      {doc.miniHeadings?.length ? (
        <>
          <h3>Mini Headings</h3>
          <ul>{doc.miniHeadings.map((x,i)=><li key={`mh-${i}`}>{x}</li>)}</ul>
        </>
      ) : null}

      {doc.miniSubtitles?.length ? (
        <>
          <h3>Mini Subtitles</h3>
          <ul>{doc.miniSubtitles.map((x,i)=><li key={`ms-${i}`}>{x}</li>)}</ul>
        </>
      ) : null}

      {doc.paragraphs?.length ? (
        <>
          <h3>Paragraphs</h3>
          {doc.paragraphs.map((p,i)=><p key={`p-${i}`}>{p}</p>)}
        </>
      ) : null}

      {doc.columnList?.length ? (
        <>
          <h3>Columns List</h3>
          <ul style={{ columnCount: 2, columnGap: '24px' }}>
            {doc.columnList.map((x,i)=><li key={`cl-${i}`}>{x}</li>)}
          </ul>
        </>
      ) : null}

      {doc.gridList?.length ? (
        <>
          <h3>Grid List</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {doc.gridList.map((x,i)=><div key={`gl-${i}`} style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>{x}</div>)}
          </div>
        </>
      ) : null}
    </div>
  );
}
