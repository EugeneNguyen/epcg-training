import classnames from 'classnames';

export default function THead({className, ...props}) {
  return (
    <thead
      className={classnames(
        'bg-gray-50',
        className,
      )}
      {...props}
    />
  );
}
