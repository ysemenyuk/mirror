import { useEffect, createRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

let state = EditorState.create({
  schema,
  plugins: exampleSetup({ schema }),
});

const EditorWithExample = () => {
  const ref = createRef(null);

  useEffect(() => {
    const editor = new EditorView(ref.current, {
      state,
      dispatchTransaction(transaction) {
        // console.log('Document size went from', transaction.before.content.size, 'to', transaction.doc.content.size);
        let newState = editor.state.apply(transaction);
        console.log(1, transaction);
        editor.updateState(newState);
      },
    });
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default EditorWithExample;
