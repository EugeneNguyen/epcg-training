import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BaseCell from '../base/cell';

export default function CellLink(props) {
  return (
    <BaseCell>
      <Link to={props.link}>
        {props.children || props.value}
      </Link>
    </BaseCell>
  );
}

CellLink.propTypes = {
  value: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node,
};
