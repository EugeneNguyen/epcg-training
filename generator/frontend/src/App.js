import './App.css';
import ModelList from "./screens/model/list";
import Header from "./components/header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <Header/>
      <div className="container">
        <ModelList/>
        <ToastContainer />
      </div>
    </main>
  );
}

export default App;
