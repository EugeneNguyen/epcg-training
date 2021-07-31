import './App.css';
import Header from './components/header';
import EtEducationProviderTableList from './generator/et_education_provider/table_list';

function App() {
  return (
    <>
      <Header/>
      <div className="container">
        <EtEducationProviderTableList />
      </div>
    </>
  );
}

export default App;
