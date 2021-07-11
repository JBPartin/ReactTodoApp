import './App.css';
import { List, AddBox, NavBar } from './components/CreateTodo';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AddBox />
      <List />
    </div>
  );
}
export default App;
