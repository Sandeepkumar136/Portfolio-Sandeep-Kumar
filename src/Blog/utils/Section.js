// src/utils/Section.js
import React from 'react';

export function emptySection(type = 'paragraph') {
  switch (type) {
    case 'miniHeading':
      return { type: 'miniHeading', text: '' };
    case 'miniSubtitle':
      return { type: 'miniSubtitle', text: '' };
    case 'paragraph':
      return { type: 'paragraph', text: '' };
    case 'rowList':
      return { type: 'rowList', heading: '', items: [] };
    case 'gridList':
      return { type: 'gridList', heading: '', items: [] };
    default:
      return { type: 'paragraph', text: '' };
  }
}

export function renderSection(s, i) {
  if (!s || !s.type) return null;

  switch (s.type) {
    case 'paragraph':
      return (
        <p key={i} className="sec-para">
          {s.text || ''}
        </p>
      );
    case 'miniHeading':
      return (
        <h3 key={i} className="sec-miniHeading">
          {s.text || ''}
        </h3>
      );
    case 'miniSubtitle':
      return (
        <p key={i} className="sec-miniSubtitle">
          {s.text || ''}
        </p>
      );
    case 'rowList': {
      const items = Array.isArray(s.items) ? s.items : [];
      return (
        <section key={i} className="sec-rowlist">
          {s.heading ? <h4 className="sec-rowlist-title">{s.heading}</h4> : null}
          <div className="sec-rowlist-items">
            {items.map((it, idx) => {
              const isObj = it && typeof it === 'object';
              const title = isObj ? (it.title || '') : (typeof it === 'string' ? it : '');
              const desc = isObj ? (it.desc || it.description || '') : '';
              return (
                <div key={idx} className="sec-row">
                  <span className="sec-row-dot" aria-hidden>•</span>
                  <div className="sec-row-content">
                    <div className="sec-row-title">{title}</div>
                    {desc ? <div className="sec-row-desc">{desc}</div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
    case 'gridList': {
      const items = Array.isArray(s.items) ? s.items : [];
      return (
        <section key={i} className="sec-gridlist">
          {s.heading ? <h4 className="sec-gridlist-title">{s.heading}</h4> : null}
          <div className="sec-gridlist-items">
            {items.map((it, idx) => {
              const isObj = it && typeof it === 'object';
              const title = isObj ? (it.title || '') : (typeof it === 'string' ? it : '');
              const desc = isObj ? (it.desc || it.description || '') : '';
              return (
                <article key={idx} className="sec-card">
                  <div className="sec-card-title">{title}</div>
                  {desc ? <div className="sec-card-desc">{desc}</div> : null}
                </article>
              );
            })}
          </div>
        </section>
      );
    }
    default:
      return null;
  }
}