'use client';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type ButtonProps = {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disable?: boolean;
    className?: string;
}
const Button = ({ type, children, danger, disable, fullWidth, onClick, secondary, className }: ButtonProps) => {
    const { pending } = useFormStatus();
    console.log("ini pending", pending);
    return (
        <button onClick={onClick} type={type} disabled={pending} className={cn(`flex justify-center rounded-md px-3 py-2 md:text-sm text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `, className, disable && "opacity-80  cursor-not-allowed", fullWidth && "w-full", secondary ? "text-green-900" : "", danger && "bg-rose-500 hover:bg-red-600 focus-visible:outline-rose-600")} >
            {children}
            {pending && (
                <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            )}
        </button>
    );
}

export default Button;