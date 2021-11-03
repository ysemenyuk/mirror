import { useEffect, createRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';

import { toggleMark } from 'prosemirror-commands';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';

import { defaultMarkdownParser } from 'prosemirror-markdown';
// import { schema } from './schema';

export const mapping = {
  ...baseKeymap,
  'Ctrl-b': toggleMark(schema.marks.strong),
  'Ctrl-e': toggleMark(schema.marks.em),
  'Ctrl-z': undo,
  'Ctrl-y': redo,
};

const content =
  'simple text **This is bold text** simple text  __This is bold text__ simple text  *This is italic text* simple text  _This is italic text_ simple text';

const EditorWithMD = () => {
  const ref = createRef(null);

  useEffect(() => {
    let state = EditorState.create({
      schema,
      doc: defaultMarkdownParser.parse(content),
      plugins: [keymap(mapping), history()],
    });

    const editor = new EditorView(ref.current, {
      state,
    });
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default EditorWithMD;
