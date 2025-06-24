const InputField = ({
    label,
    name,
    value,
    onChange,
    error,
    icon,
    suffix,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    helperText,
}: {
    label: string;
    name: string;
    value: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
}) => (
    <div className="space-y-0">
        <label className="block text-left text-xs font-semibold -mb-0 text-slate-600 tracking-wide">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>


        <div className="relative group">
            {icon && (
                <span className="absolute left-4 md:left-2 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a98cd] transition-colors duration-200 z-10">
                    {icon}
                </span>
            )}

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full pl-10 leading-tight  py-[10px] animate-in fade-in duration-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent placeholder:text-gray-400 placeholder:text-xs placeholder:font-light  ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                placeholder={placeholder}
            />
            {/* suffix icon (like eye button) */}
            {suffix && (
                <span className="absolute right-0 inset-y-0 flex items-center z-20">
                    {suffix}
                </span>
            )}
        </div>

        {error && (
            <div className="flex items-center m-0 p-0">
                {/* <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> */}
                <p className="text-red-600 text-xs font-medium"><span>*</span>{error}</p>
            </div>
        )}

        {helperText && !error && (
            <p className="text-slate-500 text-sm flex items-center space-x-2">
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span>{helperText}</span>
            </p>
        )}
    </div>
);

export default InputField;