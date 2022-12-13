import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import Categories from './components/Categories';

function App() {
  return (
    <div className="app">
      <Categories/>
      <MusicPlayer/>
    </div>
  );
}

export default App;
