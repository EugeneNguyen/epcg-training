import classnames from 'classnames';

export default function TH({className, ...props}) {
  return (
    <th
      className={classnames(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        className,
      )}
      scope="col"
      {...props}
    />
  );
}
