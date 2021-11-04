import './App.css';
import EditorWithMenu from './components/EditorWithMenu';
import EditorFromZero from './components/EditorFromZero';
import EditorWithExample from './components/EditorWithExample';
import EditorWithMD from './components/EditorWithMD';

function App() {
  return (
    <div className={'App'}>
      <EditorWithExample />
      <EditorWithMenu />
      <EditorFromZero />
      <EditorWithMD />
    </div>
  );
}

// new branch
// new branch
// third branch

export default App;
