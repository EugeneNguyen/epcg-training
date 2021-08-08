import './App.css';
import ModelList from "./screens/model/list";
import Header from "./components/header";

function App() {
  return (
    <main>
      <Header/>
      <div className="container">
        <ModelList/>
      </div>
    </main>
  );
}

export default App;
