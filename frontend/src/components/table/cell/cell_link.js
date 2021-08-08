import {Link} from "react-router-dom";

export default function CellLink(props) {
  return (
    <td>
      <Link to={props.link}>{props.children}</Link>
    </td>
  );
};
