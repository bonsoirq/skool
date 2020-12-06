import React, { Children, HTMLProps } from 'react';
import { noop } from '../../util/function';
export type Suggestion<T> = {
  label: string;
  value: T;
}

interface IProps<T> {
  suggestions: Suggestion<T>[];
  onSuggestionSelect: (value: T) => void;
}

type TProps<T> = IProps<T> & HTMLProps<HTMLInputElement>

export function Autocomplete<T> ({ suggestions, onSuggestionSelect, ...props }: TProps<T>) {
  return <div className="Autocomplete">
      <input className="form-field" {...props } />
      <ul>
        {Children.toArray(
          suggestions.map(x => <li onClick={() => onSuggestionSelect(x.value)}>{x.label}</li>)
        )}
      </ul>
    </div>
}

Autocomplete.defaultProps = {
  suggestions: [],
  onSuggestionSelect: noop,
}
