import { useEffect, createRef } from 'react';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

const EditorWithExample = () => {
  const ref = createRef(null);

  useEffect(() => {
    const editor = new EditorView(ref.current, {
      state: EditorState.create({
        schema: mySchema,
        // doc: DOMParser.fromSchema(mySchema).parse(
        //   document.querySelector('#content')
        // ),
        plugins: exampleSetup({ schema: mySchema }),
      }),
    });

    if (ref && ref.current) {
      // ref.current.innerHTML = '';
      // ref.current.appendChild(editor.dom);
    }
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default EditorWithExample;
