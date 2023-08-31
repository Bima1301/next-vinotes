import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Input = {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    disabled?: boolean;
    placeholder?: string;
}

export default function Input({ label, id, type = 'text', required = false, register, errors, disabled = false, placeholder }: Input) {
    return (
        <div className='flex flex-col items-start w-full mb-3'>
            <label htmlFor={id} className='text-sm font-semibold text-gray-700 mb-1'>{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={id}
                className={cn('w-full border border-gray-400 rounded-md py-1.5 px-2 focus:outline-gray-500', errors[id] && "focus:ring-rose-500")}
                disabled={disabled}
                placeholder={placeholder}
                {...register(id, { required })}
            />
            {errors[id] && <p className='text-red-500 text-sm mt-1'>{label} is required</p>}
        </div>
    )
}