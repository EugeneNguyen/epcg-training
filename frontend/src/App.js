import {HashRouter} from "react-router-dom";

import Header from './components/header';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteEtEducationProvider from "./generator/et_education_provider/router";
import SideBar from "./components/sidebar";
import RouteEtCourseTemplate from "./generator/et_course_template/router";
import RouteEtCourseTemplateQuestionMcq from "./generator/et_course_template_question_mcq/router";
import RouteEtCourseTemplateQuestionSource from "./generator/et_course_template_question_source/router";
import RouteEtCourseTemplateQuestionTag from "./generator/et_course_template_question_tag/router";
import RouteEtCourseTemplateExam from "./generator/et_course_template_exam/router";

function App() {
  return (
    <HashRouter>
      <div className="flex flex-row">
        <SideBar/>
        <div className="w-10/12 h-screen flex flex-col bg-gray-200">
          <Header/>
          <div className="w-full mx-auto py-6 sm:px-6 lg:px-8 overflow-y-scroll">
            <RouteEtEducationProvider/>
            <RouteEtCourseTemplate/>
            <RouteEtCourseTemplateQuestionMcq/>
            <RouteEtCourseTemplateQuestionSource/>
            <RouteEtCourseTemplateQuestionTag/>
            <RouteEtCourseTemplateExam/>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
