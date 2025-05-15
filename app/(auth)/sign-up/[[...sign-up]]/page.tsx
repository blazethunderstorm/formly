"use client"
import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    
    const style = document.createElement('style');
    style.textContent = `
      .cl-footerAction, 
      .cl-footerText, 
      .cl-footer {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return <SignUp />;
}