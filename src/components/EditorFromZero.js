import { useEffect, createRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';
// import { schema } from 'prosemirror-schema-basic';
// import { findWrapping } from 'prosemirror-transform';
// import { toggleMark } from 'prosemirror-commands';
// import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';

// import menu from './menu';
import { schema, mapping } from './schema';

const EditorFromZero = () => {
  const ref = createRef(null);

  useEffect(() => {
    let state = EditorState.create({
      schema,
      doc: DOMParser.fromSchema(schema).parse(document.querySelector('#content')),
      plugins: [keymap(mapping), history()],
    });

    let editor = new EditorView(ref.current, {
      state,
    });
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default EditorFromZero;
