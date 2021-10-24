export default function InputCheckbox({displayLabel, name, onValueChange, ...props}) {
  return (
    <div class="flex items-start">
      <div class="flex items-center h-5">
        <input
          {...props}
          type="checkbox"
          name={name}
          onChange={(event) => onValueChange && onValueChange(event.target.value)}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div class="ml-3 text-sm">
        <label
          for={name}
          class="font-medium text-gray-700"
        >
          {displayLabel}
        </label>
        <p class="text-gray-500"></p>
      </div>
    </div>
  );
}
