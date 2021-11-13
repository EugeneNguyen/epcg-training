import {HashRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {Header, SideBar} from "./components";
import RouteExamAttempt from "./screens/exam_attempt/router";
import RouteTgAuth from "./screens/auth/router";
import AuthHelper from "./screens/auth/helper";
import {ToastContainer} from "react-toastify";

function App() {
  const token = AuthHelper.useToken();

  if (token) {
    return (
      <HashRouter>
        <div className="flex flex-row">
          <div
            className="flex flex-col w-2/12 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
            <SideBar/>
          </div>
          <div className="w-10/12 h-screen flex flex-col bg-gray-200">
            <Header/>
            <div className="w-full mx-auto py-6 sm:px-6 lg:px-8 overflow-y-scroll">
              <RouteExamAttempt/>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </HashRouter>
    )
  } else {
    return (
      <HashRouter>
        <RouteTgAuth/>
        <ToastContainer/>
      </HashRouter>
    )
  }
}

export default App;
