import classNames from "classnames";

export default function TR({children}) {
  return (
    <div className={classNames("flex w-fit divide-x divide-zinc-300 hover:bg-gray-100")}>
      {children}
    </div>
  )
}