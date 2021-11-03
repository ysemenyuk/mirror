import { Schema } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';
import { baseKeymap } from 'prosemirror-commands';
// import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';

export const schema = new Schema({
  nodes: {
    text: {
      group: 'inline',
    },
    star: {
      inline: true,
      group: 'inline',
      toDOM() {
        return ['star', '🟊'];
      },
      parseDOM: [{ tag: 'star' }],
    },
    paragraph: {
      group: 'block',
      content: 'inline*',
      toDOM() {
        return ['p', 0];
      },
      parseDOM: [{ tag: 'p' }],
    },
    boring_paragraph: {
      group: 'block',
      content: 'text*',
      marks: '',
      toDOM() {
        return ['p', { class: 'boring' }, 0];
      },
      parseDOM: [{ tag: 'p.boring', priority: 60 }],
    },
    doc: {
      content: 'block+',
    },
  },
  marks: {
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['em', 0];
      },
    },
    // strong: {
    //   parseDOM: [
    //     { tag: 'strong' },
    //     { tag: 'b', getAttrs: (node) => node.style.fontWeight !== 'normal' && null },
    //     { style: 'font-weight', getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null },
    //   ],
    //   toDOM() {
    //     return ['strong', 0];
    //   },
    // },
    strong: {
      parseDOM: [
        { tag: 'b' },
        { tag: 'strong' },
        { style: 'font-weight', getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null },
      ],
      toDOM() {
        return ['strong'];
      },
    },
    code: {
      parseDOM: [{ tag: 'code' }],
      toDOM() {
        return ['code', 0];
      },
    },
  },
});

export const mapping = {
  ...baseKeymap,
  'Ctrl-b': toggleMark(schema.marks.strong),
  'Ctrl-e': toggleMark(schema.marks.em),
  'Ctrl-Space': insertStar,
  'Ctrl-z': undo,
  'Ctrl-y': redo,
};

function insertStar(state, dispatch) {
  let type = schema.nodes.star;
  let { $from } = state.selection;
  if (!$from.parent.canReplaceWith($from.index(), $from.index(), type)) return false;
  dispatch(state.tr.replaceSelectionWith(type.create()));
  return true;
}
