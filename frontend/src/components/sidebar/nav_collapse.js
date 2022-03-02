import {useState} from "react";

export default function NavCollapse({label, children}) {
  const [open, setOpen] = useState(false);
  const img = open ? (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg>
  ) : (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  )
  return (
    <>
      <a
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-700"
      >
        {img}
        <span className="mx-4 font-medium">{label}</span>
      </a>
      {open ? children : null}
    </>
  );
}