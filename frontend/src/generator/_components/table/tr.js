import classnames from 'classnames';

export default function TR({className, hover, ...props}) {
  return (
    <tr
      className={classnames(
        {'hover:bg-gray-100': hover},
        className,
      )}
      {...props}
    />
  );
}
