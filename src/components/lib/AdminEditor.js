// src/components/lib/AdminEditor.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { databases, ID, cfg, Permission, Role, account } from '../../appwrite';

export default function AdminEditor() {
  const [heading, setHeading] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [miniHeadings, setMiniHeadings] = useState(['']);
  const [miniSubtitles, setMiniSubtitles] = useState(['']);
  const [paragraphs, setParagraphs] = useState(['']);
  const [columnList, setColumnList] = useState(['']);
  const [gridList, setGridList] = useState(['']);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    account.get().then(u => setUserId(u.$id), () => setUserId(null));
  }, []);

  const perms = useMemo(() => {
    if (!userId) return [];
    return [
      Permission.read(Role.any()),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];
  }, [userId]);

  const onChangeArr = (arr, setArr, i, v) => {
    const copy = [...arr];
    copy[i] = v;
    setArr(copy);
  };
  const add = (setArr) => setArr((p) => [...p, '']);
  const remove = (arr, setArr, i) => {
    const copy = arr.filter((_, idx) => idx !== i);
    setArr(copy.length ? copy : ['']);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!userId) { alert('Login required'); return; }
    setSaving(true);
    try {
      const payload = {
        heading,
        subtitle,
        miniHeadings: miniHeadings.filter(Boolean),
        miniSubtitles: miniSubtitles.filter(Boolean),
        paragraphs: paragraphs.filter(Boolean),
        columnList: columnList.filter(Boolean),
        gridList: gridList.filter(Boolean),
      };
      await databases.createDocument(cfg.databaseId, cfg.collectionId, ID.unique(), payload, perms);
      alert('Submitted');
      setHeading(''); setSubtitle('');
      setMiniHeadings(['']); setMiniSubtitles(['']);
      setParagraphs(['']); setColumnList(['']); setGridList(['']);
    } catch (err) {
      alert(err?.message || 'Submit failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 900, margin: '24px auto' }}>
      <label>Heading</label>
      <input value={heading} onChange={(e)=>setHeading(e.target.value)} required />

      <label>Subtitle</label>
      <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} required />

      <h3>Mini Headings</h3>
      {miniHeadings.map((v, i)=>(
        <div key={`mh-${i}`}>
          <input value={v} onChange={(e)=>onChangeArr(miniHeadings,setMiniHeadings,i,e.target.value)} />
          <button type="button" onClick={()=>remove(miniHeadings,setMiniHeadings,i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={()=>add(setMiniHeadings)}>Add more mini heading</button>

      <h3>Mini Subtitles</h3>
      {miniSubtitles.map((v, i)=>(
        <div key={`ms-${i}`}>
          <input value={v} onChange={(e)=>onChangeArr(miniSubtitles,setMiniSubtitles,i,e.target.value)} />
          <button type="button" onClick={()=>remove(miniSubtitles,setMiniSubtitles,i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={()=>add(setMiniSubtitles)}>Add more mini subtitle</button>

      <h3>Paragraphs</h3>
      {paragraphs.map((v, i)=>(
        <div key={`p-${i}`}>
          <textarea value={v} onChange={(e)=>onChangeArr(paragraphs,setParagraphs,i,e.target.value)} />
          <button type="button" onClick={()=>remove(paragraphs,setParagraphs,i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={()=>add(setParagraphs)}>Add more paragraph</button>

      <h3>Columns List</h3>
      {columnList.map((v, i)=>(
        <div key={`cl-${i}`}>
          <input value={v} onChange={(e)=>onChangeArr(columnList,setColumnList,i,e.target.value)} />
          <button type="button" onClick={()=>remove(columnList,setColumnList,i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={()=>add(setColumnList)}>Add more column list item</button>

      <h3>Grid List</h3>
      {gridList.map((v, i)=>(
        <div key={`gl-${i}`}>
          <input value={v} onChange={(e)=>onChangeArr(gridList,setGridList,i,e.target.value)} />
          <button type="button" onClick={()=>remove(gridList,setGridList,i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={()=>add(setGridList)}>Add more grid list item</button>

      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
      </div>
    </form>
  );
}
