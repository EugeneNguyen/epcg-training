import {Link, useRouteMatch} from "react-router-dom";

export default function NavItem({to, label}) {
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
