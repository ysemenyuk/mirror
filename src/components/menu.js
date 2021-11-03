import { Plugin } from 'prosemirror-state';
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { schema } from 'prosemirror-schema-basic';

class MenuView {
  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.createElement('div');
    this.dom.className = 'menu';
    this.items.forEach(({ dom }) => this.dom.appendChild(dom));
    this.update();

    this.dom.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.editorView.focus();
      this.items.forEach(({ command, dom }) => {
        if (dom.contains(e.target)) command(this.editorView.state, this.editorView.dispatch);
      });
    });
  }

  update() {
    console.log('update', this.editorView);

    this.items.forEach(({ command, dom }) => {
      let active = command(this.editorView.state, null);
      dom.style.color = active ? '' : '#919191';
    });
  }

  destroy() {
    this.dom.remove();
  }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let menuView = new MenuView(items, editorView);
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom);
      return menuView;
    },
  });
}

// Helper function to create menu icons
function icon(text, name) {
  let span = document.createElement('span');
  span.className = 'menuicon ' + name;
  span.title = name;
  span.textContent = text;
  return span;
}

let menu = menuPlugin([
  { command: toggleMark(schema.marks.strong), dom: icon('Bold', 'strong') },
  { command: toggleMark(schema.marks.em), dom: icon('Italic', 'em') },
  { command: setBlockType(schema.nodes.paragraph), dom: icon('Paragraph', 'paragraph') },
  { command: setBlockType(schema.nodes.heading, { level: 1 }), dom: icon('Heading-1', 'heading') },
  { command: setBlockType(schema.nodes.heading, { level: 2 }), dom: icon('Heading-2', 'heading') },
  { command: setBlockType(schema.nodes.heading, { level: 3 }), dom: icon('Heading-3', 'heading') },
  { command: wrapIn(schema.nodes.blockquote), dom: icon('blockquote', 'blockquote') },
]);

export default menu;
