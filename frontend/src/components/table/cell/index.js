import CellDatetime from "./cell_datetime";
import CellLink from "./cell_link";

export default function Cell({type, link, ...props}) {
  if (type === 'DATETIME') {
    return <CellDatetime {...props} />;
  }
  if (link) {
    return <CellLink link={link} {...props} />;
  }
  return  <td>{props.children}</td>;
};
