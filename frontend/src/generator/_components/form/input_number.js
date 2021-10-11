function InputNumber({displayLabel, name, onValueChange, ...props}) {
  return (
    <div>
      <label
        class="text-gray-700 dark:text-gray-200"
        for={name}
      >
        {displayLabel}
      </label>
      <input
        {...props}
        name={name}
        onChange={(event) => onValueChange && onValueChange(parseFloat(event.target.value))}
        type="number"
        step="any"
      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
      />
    </div>
  );
}

export default InputNumber;
