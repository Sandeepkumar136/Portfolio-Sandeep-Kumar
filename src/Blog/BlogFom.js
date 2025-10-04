// src/components/BlogForm.js
import React, { useCallback, useEffect, useState } from 'react';
import { databases, DB_ID, COLLECTION_ID, ID, Permission, Role } from './lib/appwrite';
import { emptySection } from './utils/Section';
import { toast, ToastContainer } from 'react-toastify';

export default function BlogForm({ me, editingDoc, onSaved, onCancel }) {
  // Controlled inputs
  const [title, setTitle] = useState(editingDoc?.heading ?? editingDoc?.title ?? '');
  const [subtitle, setSubtitle] = useState(editingDoc?.subtitle || '');
  const [sections, setSections] = useState(() => {
    if (editingDoc?.sectionsJson) {
      try { return JSON.parse(editingDoc.sectionsJson); } catch { return []; }
    }
    return [];
  });
  const [newType, setNewType] = useState('miniHeading');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [isBformOpen, setIsBformOpen] = useState(false);

  const toggleBform = useCallback(() => setIsBformOpen(v => !v), []);

  // Sync when entering/exiting edit mode
  useEffect(() => {
    if (editingDoc?.$id) {
      setTitle(editingDoc.heading ?? editingDoc.title ?? '');
      setSubtitle(editingDoc.subtitle || '');
      try { setSections(editingDoc.sectionsJson ? JSON.parse(editingDoc.sectionsJson) : []); }
      catch { setSections([]); }
      setNewType('miniHeading');
    } else {
      // back to create mode
      setTitle('');
      setSubtitle('');
      setSections([]);
      setNewType('miniHeading');
    }
  }, [editingDoc]);

  // Accept optional explicit type so icons can add directly
  function addSection(typeOverride) {
    const type = typeOverride || newType;
    setSections(prev => [...prev, emptySection(type)]);
  }

  function updateSection(idx, updater) {
    setSections(prev => prev.map((s, i) => (i === idx ? updater(s) : s)));
  }

  function removeSection(idx) {
    setSections(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const payload = {
        heading: title,
        subtitle,
        sectionsJson: JSON.stringify(sections),
        authorId: me?.$id || ''
      };

      let result;
      let message;

      if (editingDoc?.$id) {
        result = await databases.updateDocument(DB_ID, COLLECTION_ID, editingDoc.$id, payload);
        message = 'Blog updated';
      } else {
        const perms = [Permission.read(Role.any())];
        if (me?.$id) {
          perms.push(Permission.update(Role.user(me.$id)));
          perms.push(Permission.delete(Role.user(me.$id)));
        }
        result = await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), payload, perms);
        message = 'Your Blog added';
      }

      toast(message);


      if (!editingDoc?.$id) {
        setTitle('');
        setSubtitle('');
        setSections([]);
        setNewType('miniHeading');
      }

      onSaved?.(result);
    } catch (error) {
      setErr(error?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className='ad-form-main ' onSubmit={handleSubmit}>
      <ToastContainer/>
      <div className="ad-f-head-main-contain">
        <input className='ad-f-head-m'
          placeholder="Heading"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input className='ad-f-head-m'
          placeholder="Subtitle"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          required
        />
      </div>

      {/* Dropdown toolbar with icons + select + button inside */}
      <div className="b-f-dp-contain">
        <button onClick={toggleBform} type="button" className="btn-b-f-db">
          <i className={`bx ${isBformOpen ? 'bx-x' : 'bx-plus'}`}></i>
        </button>

        {isBformOpen && (
          <div className="b-f-dp-c">
            <ul className="b-f-dp-c-l">
              <li className="b-f-dp-c-i" role="button" tabIndex={0} title="Mini Heading"
                  onClick={() => addSection('miniHeading')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addSection('miniHeading')}>
                <i className="icon-b-f-db-c-l bx bx-heading"></i>
              </li>
              <li className="b-f-dp-c-i" role="button" tabIndex={0} title="Mini Subtitle"
                  onClick={() => addSection('miniSubtitle')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addSection('miniSubtitle')}>
                <i className="icon-b-f-db-c-l bx bx-captions"></i>
              </li>
              <li className="b-f-dp-c-i" role="button" tabIndex={0} title="Paragraph"
                  onClick={() => addSection('paragraph')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addSection('paragraph')}>
                <i className="icon-b-f-db-c-l bx bx-paragraph"></i>
              </li>
              <li className="b-f-dp-c-i" role="button" tabIndex={0} title="Row List"
                  onClick={() => addSection('rowList')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addSection('rowList')}>
                <i className="icon-b-f-db-c-l bx bx-list-ul"></i>
              </li>
              <li className="b-f-dp-c-i" role="button" tabIndex={0} title="Grid List"
                  onClick={() => addSection('gridList')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addSection('gridList')}>
                <i className="icon-b-f-db-c-l bx bx-table-columns-merge"></i>
              </li>
            </ul>

            {/* <div className="b-f-dp-actions" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
              <select value={newType} onChange={e => setNewType(e.target.value)}>
                <option value="miniHeading">Mini Heading</option>
                <option value="miniSubtitle">Mini Subtitle</option>
                <option value="paragraph">Paragraph</option>
                <option value="rowList">Row List</option>
                <option value="gridList">Grid List</option>
              </select>
              <button type="button" onClick={() => addSection()}>Add section</button>
            </div> */}
          </div>
        )}
      </div>

      {/* Sections editor */}
      <div>
        {sections.map((sec, idx) => (
          <div className='bl-f-f-container' key={idx}>
            <div className='bl-f-f-t-contain'>
              <strong>{sec.type}</strong>
              <button type="button" onClick={() => removeSection(idx)}><i className='bx bx-x'></i></button>
            </div>

            {['miniHeading', 'miniSubtitle', 'paragraph'].includes(sec.type) && (
              <textarea
                rows={sec.type === 'paragraph' ? 4 : 2}
                placeholder={sec.type === 'paragraph' ? 'Paragraph text' : 'Text'}
                value={sec.text || ''}
                onChange={e => updateSection(idx, s => ({ ...s, text: e.target.value }))}
              />
            )}

            {sec.type === 'rowList' && (
              <div className='bl-r-t-s'>
                <input
                  placeholder="Row list heading"
                  value={sec.heading || ''}
                  onChange={e => updateSection(idx, s => ({ ...s, heading: e.target.value }))}
                />
                {(sec.items || []).map((it, i) => (
                  <div className='bl-r-t-s-f' key={i} style={{ display: 'flex', gap: 8 }}>
                    <input
                      style={{ flex: 1 }}
                      placeholder={`Row item ${i + 1}`}
                      value={it}
                      onChange={e =>
                        updateSection(idx, s => {
                          const items = [...(s.items || [])];
                          items[i] = e.target.value;
                          return { ...s, items };
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateSection(idx, s => {
                          const items = [...(s.items || [])];
                          items.splice(i, 1);
                          return { ...s, items };
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button" className='bl-t-m-b'
                  onClick={() => updateSection(idx, s => ({ ...s, items: [...(s.items || []), ''] }))}
                >
                  Add row item
                </button>
              </div>
            )}

            {sec.type === 'gridList' && (
              <div className='bl-r-t-s'>
                <input
                  placeholder="Grid list heading"
                  value={sec.heading || ''}
                  onChange={e => updateSection(idx, s => ({ ...s, heading: e.target.value }))}
                />
                {(sec.items || []).map((it, i) => (
                  <div className='bl-r-t-s-f' key={i} style={{ display: 'flex', gap: 8 }}>
                    <input
                      style={{ flex: 1 }}
                      placeholder={`Grid item ${i + 1}`}
                      value={it}
                      onChange={e =>
                        updateSection(idx, s => {
                          const items = [...(s.items || [])];
                          items[i] = e.target.value;
                          return { ...s, items };
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateSection(idx, s => {
                          const items = [...(s.items || [])];
                          items.splice(i, 1);
                          return { ...s, items };
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button className='bl-t-m-b'
                  type="button"
                  onClick={() => updateSection(idx, s => ({ ...s, items: [...(s.items || []), ''] }))}
                >
                  Add grid item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='bf-s-b-c'>
        <button  type="submit" disabled={busy}>{editingDoc ? 'Update' : 'Publish'}</button>
        {onCancel && <button className='bf-s-b-c' type="button" onClick={onCancel}>Cancel</button>}
      </div>
      {err && <div className='err' style={{ color: 'red' }}>{err}</div>}
    </form>
  );
}
