import React from 'react';

interface IProps {
  children: React.ReactNode,
}

export function HeaderLayout({ children }: IProps) {
  return <>
    <header />
    <section>
      {children}
    </section>
  </>
}
