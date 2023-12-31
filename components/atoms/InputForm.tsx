import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from 'antd';

type Input = {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    disabled?: boolean;
    placeholder?: string;
    errorMessage?: string;
}
export default function InputForm({ label, id, type = 'text', required = false, register, errors, disabled = false, placeholder, errorMessage }: Input) {
    return (
        <div className='flex flex-col items-start w-full mb-3'>
            <label htmlFor={id} className='md:text-sm text-xs font-semibold text-gray-700 mb-1'>{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={id}
                className={cn('w-full border border-gray-400 rounded-md md:py-1.5 md:px-2 py-1 px-2 md:text-sm text-xs focus:outline-gray-500', errors[id] && "focus:ring-rose-500")}
                disabled={disabled}
                placeholder={placeholder}
                {...register(id, { required })}
            />
            {errors[id] && <p className='text-red-500 text-sm mt-1'>{errorMessage}  </p>}
        </div>
    )
}