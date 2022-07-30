import classnames from 'classnames';
import PropTypes from "prop-types";

export default function TH(props) {
  if (props.hidden) return null;
  return (
    <th
      className={classnames(`px-6 w-${props.size} py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`,)}
      scope="col"
      {...props}
    />
  );
}

TH.propTypes = {
  children: PropTypes.any,
  size: PropTypes.number,
  hidden: PropTypes.bool,
};

TH.defaultProps = {
  size: 40,
  hidden: false,
}