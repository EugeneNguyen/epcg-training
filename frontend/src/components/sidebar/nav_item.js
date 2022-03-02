import {Link, useRouteMatch} from "react-router-dom";

export default function NavItem({to, label}) {
  const match = useRouteMatch(to);
  const cls = match ?
    "flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md" :
    "flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-700";

  return (
    <Link className={cls} to={to}>
      <span className="ml-9 mr-4 font-medium">{label}</span>
    </Link>
  );
}
