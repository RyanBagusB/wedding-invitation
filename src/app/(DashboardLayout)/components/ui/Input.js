"use client";

export default function Input({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value = "",
  required = false,
  error = "",
  onChange,
  options = [],
  className = "",
}) {
  const describedBy = error ? `${id}-error` : undefined;

  let inputElement = null;

  if (type === "textarea") {
    inputElement = (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        onChange={onChange}
        className={`w-full mt-1 rounded-lg border text-slate-800 border-gray-400 dark:border-gray-400 px-3 py-2 dark:bg-slate-800 dark:text-violet-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset ${className}`}
      />
    );
  } else if (type === "select") {
    inputElement = (
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        onChange={onChange}
        className={`w-full mt-1 rounded-lg border text-slate-800 border-gray-400 dark:border-gray-400 px-3 py-2 dark:bg-slate-800 dark:text-violet-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "checkbox" || type === "radio") {
    inputElement = options.map((opt) => (
      <label key={opt.value} className="inline-flex items-center mr-4">
        <input
          type={type}
          name={name}
          value={opt.value}
          checked={value === opt.value || (Array.isArray(value) && value.includes(opt.value))}
          onChange={onChange}
          className="mr-2 accent-violet-500"
        />
        {opt.label}
      </label>
    ));
  } else {
    inputElement = (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        onChange={onChange}
        className={`w-full mt-1 rounded-lg border text-slate-800 border-gray-400 dark:border-gray-400 px-3 py-2 dark:bg-slate-800 dark:text-violet-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset ${className}`}
      />
    );
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-800 dark:text-gray-400"
        >
          {label}
        </label>
      )}
      {inputElement}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
