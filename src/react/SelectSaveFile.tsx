import React from 'react';
import { head } from '../util/array';
import { openFileDialog, saveFileDialog } from '../util/native'

interface IProps {
  onSuccess(path: string): void
}

export function SelectSaveFile(props: IProps) {
  return (
    <>
      <h3>Nie wykryto pliku zapisu</h3>
      <button
        onClick={async e => {
          const path = await openFileDialog()
            .then(selection => selection.filePaths)
            .then(head)

          if (path != null) {
            props.onSuccess(path)
          }
        }}
      >
        Otwórz plik...
      </button>
      <button
        onClick={async e => {
          const path = await saveFileDialog()
            .then(selection => selection.filePath)

          if (path != null) {
            props.onSuccess(path)
          }
        }}
      >
        Nowy plik...
      </button>
    </>
  );
}
