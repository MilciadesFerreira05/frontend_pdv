import { useState } from "react";
export function SelectSearchable({name, options, onChange, placeholder}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearch("");
    onChange(option);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div className="relative">
      <select
        className="w-full px-4 py-2 leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        value={selectedOption ? selectedOption.value : ""}
        onChange={event => handleOptionClick(options.find(option => option.value === event.target.value))}
      >
        <option value="">{placeholder}</option>
        {filteredOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
