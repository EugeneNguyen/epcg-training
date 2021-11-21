import classnames from 'classnames';

export default function Button({color="primary", outline=false, className, ...props}) {
  return (
    <button
      {...props}
      className={classnames(
        'inline-flex justify-center',
        'py-2 px-4',
        'text-sm font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',

        {'border border-transparent rounded-md shadow-sm text-white': outline === false},
        {'border border-gray-300 rounded-md shadow-sm text-gray-700': outline === true},

        {'bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500': outline === true},
        {'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': color === "primary" && outline === false},
        {'bg-green-600 hover:bg-green-700 focus:ring-green-500': color === "success" && outline === false},
        {'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500': color === "warning" && outline === false},
        {'bg-red-600 hover:bg-red-700 focus:ring-red-500': color === "danger" && outline === false},
        className,
      )}
    />
  );
};