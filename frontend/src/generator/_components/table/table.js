import classnames from 'classnames';

export default function Table({className, ...props}) {
  return (
    <div className={classnames(`w-full overflow-x-auto`)}>
      <table
        className={classnames(
          'min-w-full divide-y divide-gray-200 table-fixed',
          className,
        )}
        {...props}
      />
    </div>
  );
}
