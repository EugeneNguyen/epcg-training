import {Link} from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import {useState} from "react";
import AuthHelper from '../../screens/auth/helper';

export default function SideBar() {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">EPCG</h2>
      <NavHr />
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-5">
          <NavItem to="/course" label="Course" />
        </nav>
        <div className="flex items-center px-4 -mx-2" onClick={() => AuthHelper.removeToken()}>
          <h4 className="mx-2 font-medium text-gray-800">Logout</h4>
        </div>
      </div>
    </>
  );
}

function NavCollapse({label, children}) {
  const [open, setOpen] = useState(false);
  const img = open ? (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg>
  ) : (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  )
  return (
    <>
      <a
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
      >
        {img}
        <span className="mx-4 font-medium">{label}</span>
      </a>
      {open ? children : null}
    </>
  );
}

function NavItem({to, label}) {
  const match = useRouteMatch(to);
  const cls = match ?
    "flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200" :
    "flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700";

  return (
    <Link className={cls} to={to}>
      <span className="ml-9 mr-4 font-medium">{label}</span>
    </Link>
  );
}

function NavHr() {
  return (
    <hr className="my-6 dark:border-gray-600"/>
  );
}