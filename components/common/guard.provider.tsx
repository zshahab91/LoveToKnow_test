import { useRouter } from 'next/router';
import React from 'react';

export const GuardProvider: React.FC = ({ children }) => {
  const { pathname, push } = useRouter();

  return <>{children}</>;
};
