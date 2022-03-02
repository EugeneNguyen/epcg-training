import classNames from "classnames";

export default function TBody({children}) {
  return (
    <div
      className={classNames(
        'bg-white divide-y divide-gray-200',
      )}
    >
      {children}
    </div>
  )
}