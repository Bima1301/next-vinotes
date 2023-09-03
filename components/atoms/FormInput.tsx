import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Input = {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    disabled?: boolean;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;

}

export default function FormInput({ label, id, type = 'text', required = false, register, disabled = false, placeholder, error, errorMessage }: Input) {
    return (
        <div className='flex flex-col items-start w-full mb-3'>
            <label htmlFor={id} className='md:text-sm text-xs font-semibold text-gray-700 mb-1'>{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={id}
                className={cn('w-full border border-gray-400 rounded-md md:py-1.5 md:px-2 py-1 px-2 md:text-sm text-xs focus:outline-gray-500', error && "focus:ring-rose-500")}
                disabled={disabled}
                placeholder={placeholder}
                {...register(id, { required })}
            />
            {(error && errorMessage) && (
                <small className="text-xs lg:text-sm text-red-500">{errorMessage}</small>
            )}

        </div>
    )
}