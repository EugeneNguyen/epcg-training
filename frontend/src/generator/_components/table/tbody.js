import classnames from 'classnames';

export default function TBody({className, ...props}) {
  return (
    <tbody
      className={classnames(
        'bg-white divide-y divide-gray-200',
        className,
      )}
      {...props}
    />
  );
}
