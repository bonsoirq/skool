import React from 'react';
import { head } from '../util/array';
import { openFileDialog, saveFileDialog } from '../util/native'

interface IProps {
  onSuccess(path: string): void
}

export function SelectSaveFile(props: IProps) {
  return (
    <>
      <h3>No save file detected</h3>
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
        Open file
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
        New save file
      </button>
    </>
  );
}
