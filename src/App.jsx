import Dashboard from './components/Dashboard';
import Counter from './components/Counter';
import SearchBar from './components/SearchBar';
import SecretMessage from './components/SecretMessage';
import TodoList from './components/TodoList';
import AutoFocusForm from './components/AutoFocusForm';
import "./App.css";

function App() {
  return (
    <div>
      <div>

        {/* Task1 component */}
        <Dashboard />

        {/* Task2 component */}
        <Counter />

        {/* Task3 component */}
        <SearchBar />

        {/* Task4 component */}
        <SecretMessage />

        {/* Task5 component */}
        <TodoList />

        {/* Task6 component */}
        <AutoFocusForm />
      </div>
    </div>
  );
}

export default App;
