import {HashRouter} from "react-router-dom";

import './App.css';
import Header from './components/header';
import RouteEtEducationProvider from "./generator/et_education_provider/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteEtCourseTemplate from "./generator/et_course_template/router";

function App() {
  return (
    <HashRouter>
      <Header/>
      <div className="container">
        <RouteEtEducationProvider />
        <RouteEtCourseTemplate />
        <ToastContainer />
      </div>
    </HashRouter>
  );
}

export default App;
