import * as React from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type = "text", name, value, placeholder, error, onChange }: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-(--color-text-muted) uppercase tracking-wider">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-[#FAFAF8] border ${
                    error ? 'border-(--color-danger)' : 'border-(--color-border-strong)'
                } rounded-xl px-4 py-3 outline-none focus:border-(--color-accent) transition-colors`}
            />
            {error && <span className="text-(--color-danger) text-[12px] mt-1">{error}</span>}
        </div>
    );
};

export default InputField;