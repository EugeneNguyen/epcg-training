import classnames from 'classnames';

export default function Table({className, ...props}) {
  return (
    <table
      className={classnames(
        'min-w-full divide-y divide-gray-200',
        className,
      )}
      {...props}
    />
  );
}
