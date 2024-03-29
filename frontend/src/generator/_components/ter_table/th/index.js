import PropTypes from 'prop-types';
import classNames from "classnames";

export default function TH(props) {
  if (props.hidden) return null;
  return (
    <div
      className={classNames(`h-6 w-${props.size} flex justify-center items-center bg-zinc-200 font-sans text-sm text-gray-700`)}
    >
      {props.children}
    </div>
  )
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