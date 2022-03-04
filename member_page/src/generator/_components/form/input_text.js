export default function InputText({displayLabel, name, onValueChange, ...props}) {
  return (
    <div>
      <label
        class="text-gray-700"
        for={name}
      >
        {displayLabel}
      </label>
      <input
        {...props}
        name={name}
        onChange={(event) => onValueChange && onValueChange(event.target.value)}
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
      />
    </div>
  );
}

