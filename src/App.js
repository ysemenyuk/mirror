import './App.css';
import Editor from './components/Editor';
import EditorWithExample from './components/EditorWithExample';

function App() {
  return (
    <div className={'App'}>
      <EditorWithExample />
      <Editor />
    </div>
  );
}

export default App;
