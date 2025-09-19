import React from 'react';

export function Breadcrumb({ className, ...props }) {
  return (
    <nav className={className} {...props} />
  );
}

export function BreadcrumbList({ className, ...props }) {
  return (
    <ol className={`flex flex-wrap items-center gap-1.5 ${className || ''}`} {...props} />
  );
}

export function BreadcrumbItem({ className, ...props }) {
  return (
    <li className={`flex items-center gap-1.5 ${className || ''}`} {...props} />
  );
}

export function BreadcrumbLink({ className, ...props }) {
  return (
    <a className={`text-sm font-medium text-gray-500 hover:text-gray-900 ${className || ''}`} {...props} />
  );
}

export function BreadcrumbPage({ className, ...props }) {
  return (
    <span className={`text-sm font-medium text-gray-900 ${className || ''}`} {...props} />
  );
}

export function BreadcrumbSeparator({ className, ...props }) {
  return (
    <span className={`text-gray-400 ${className || ''}`} {...props}>
      /
    </span>
  );
}