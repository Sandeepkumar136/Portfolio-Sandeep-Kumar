// src/utils/sections.js
export function emptySection(type) {
  if (type === 'miniHeading') return { type, text: '' };
  if (type === 'miniSubtitle') return { type, text: '' };
  if (type === 'paragraph') return { type, text: '' };
  if (type === 'rowList') return { type, heading: '', items: [''] };
  if (type === 'gridList') return { type, heading: '', items: [''] };
  return { type: 'paragraph', text: '' };
}

export function renderSection(sec, key) {
  if (sec.type === 'miniHeading') return <h3 key={key}>{sec.text}</h3>;
  if (sec.type === 'miniSubtitle') return <h4 key={key} style={{ color: '#555' }}>{sec.text}</h4>;
  if (sec.type === 'paragraph') return <p key={key} style={{ lineHeight: 1.6 }}>{sec.text}</p>;
  if (sec.type === 'rowList') {
    return (
      <div key={key} style={{ margin: '12px 0' }}>
        <strong>{sec.heading}</strong>
        <ul>
          {sec.items?.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      </div>
    );
  }
  if (sec.type === 'gridList') {
    return (
      <div key={key} style={{ margin: '12px 0' }}>
        <strong>{sec.heading}</strong>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {sec.items?.map((it, i) => <div key={i} style={{ border: '1px solid #eee', padding: 8 }}>{it}</div>)}
        </div>
      </div>
    );
  }
  return null;
}
