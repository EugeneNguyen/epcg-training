export default function Box({children, title, subtitle, padding}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {(title || subtitle) && (
        <div className="px-4 py-5 sm:px-6">
          {title && (
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`border-t border-gray-200 ${padding ? 'p-4' : ''}`}>
        {children}
      </div>
    </div>
  )
}
