import CellDatetime from './cell_datetime';
import CellLink from './cell_link';
import CellText from './cell_text';
import CellCheckbox from './cell_checkbox';

export default function Cell({type, link, hidden, ...props}) {
  if (hidden) return null;
  if (type === 'DATETIME') {
    return <CellDatetime {...props} />;
  }
  if (type === 'TINYINT(1)') {
    return <CellCheckbox {...props} />;
  }
  if (link) {
    return <CellLink link={link} {...props} />;
  }
  return  <CellText {...props} />;
};
