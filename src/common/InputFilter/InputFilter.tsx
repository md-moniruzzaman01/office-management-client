import { inputFilterProps } from "./type";

const InputFilter: React.FC<inputFilterProps> = ({
  Filter = [],
  label,
  IsDisabled = false,
  placeholder = "All",
  className,
  inputName,
  onChange,
  value,
}) => {
  return (
    <div className={`${label && "space-y-1"}`}>
      <label className="text-lg font-semibold ">{label}</label>
      <select
        onChange={onChange}
        name={inputName}
        disabled={IsDisabled}
        className={` ${className} py-2  rounded-sm w-full border-2 text-shadeOfGray border-gray-200 shadow-sm ml-0 `}
        value={value}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {Filter &&
          Filter.map((item, i) => (
            <option key={i} value={item?.value}>
              {item?.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default InputFilter;
