import classNames from "classnames";

export default function Table({children}) {
  return (
    <div className={classNames(
      "w-fit divide-y divide-gray-200 border border-gray-200 max-w-full"
    )}>
      {children}
    </div>
  );
}