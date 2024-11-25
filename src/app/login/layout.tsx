'use client';

import React, { ReactNode } from 'react';

type LoginProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
