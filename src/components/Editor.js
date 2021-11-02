import { useEffect, createRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { findWrapping } from 'prosemirror-transform';

import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { undo, redo, history } from 'prosemirror-history';

import menu from './menu';

const Editor = () => {
  const ref = createRef(null);

  useEffect(() => {
    let state = EditorState.create({
      schema,
      plugins: [menu, history(), keymap({ 'Ctrl-z': undo, 'Ctrl-y': redo }), keymap(baseKeymap)],
    });

    let editor = new EditorView(ref.current, {
      state,
    });
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default Editor;
