import React from 'react';

interface IProps {
  when: boolean,
  children: React.ReactNode,
}
export function Condition({ when, children }: IProps) {
  if (when) {
    return React.Children.only(children)
  }
  return null
}
