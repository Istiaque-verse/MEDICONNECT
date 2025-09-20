import React from 'react';

export function MediConnectLogo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
        className="text-primary-600"
        stroke="#4f46e5"
      />
      <path
        d="M12 8v8M8 12h8"
        className="text-primary-600"
        stroke="#4f46e5"
      />
    </svg>
  );
}