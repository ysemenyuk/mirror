import { useEffect, createRef } from 'react';
import markdownit from 'markdown-it';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';
// import { schema } from 'prosemirror-schema-basic';
// import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { MarkdownParser } from 'prosemirror-markdown';

import { schema } from './schema';

const mdParser = new MarkdownParser(schema, markdownit('commonmark', { html: false }), {
  paragraph: { block: 'paragraph' },
  em: { mark: 'em' },
  strong: { mark: 'strong' },
});

const content =
  'simple text **This is bold text** simple text  __This is bold text__ simple text  *This is italic text* simple text  _This is italic text_ simple text';

// const md = markdownit('commonmark', { html: false });
// const str = md.render(content);

// function htmlToElement(html) {
//   let template = document.createElement('template');
//   html = html.trim();
//   template.innerHTML = html;
//   return template.content.firstChild;
// }

// console.log(111, htmlToElement(str));
// console.log(222, document.querySelector('#content'));

const EditorWithExample = () => {
  const ref = createRef(null);

  useEffect(() => {
    let state = EditorState.create({
      schema,
      // doc: DOMParser.fromSchema(schema).parse(document.querySelector('#content')),
      // doc: DOMParser.fromSchema(schema).parse(htmlToElement(str)),
      doc: mdParser.parse(content),
      plugins: exampleSetup({ schema }),
    });

    const editor = new EditorView(ref.current, {
      state,
    });
  }, [ref]);

  return <div className={'editor'} ref={ref}></div>;
};

export default EditorWithExample;
