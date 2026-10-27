'use client';

import { usePathname } from 'next/navigation';

export default function AppShell({ children }) {
  const pathname = usePathname();
  return <div key={pathname} className="app-route-enter">{children}</div>;
}
