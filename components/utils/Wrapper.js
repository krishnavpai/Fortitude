import React from 'react';
export default function Wrapper({ children }) {
  return (
    <>
      <div style={{ marginTop: '5.5em', background: '#eaeaea' }}>
        {children}
      </div>
    </>
  );
}
