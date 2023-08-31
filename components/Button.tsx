'use client';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

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
    return (
        <button onClick={onClick} type={type} disabled={disable} className={cn(`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`, className, disable && "opacity-80 cursor-default", fullWidth && "w-full", secondary ? "text-green-900" : "text-black", danger && "bg-rose-500 hover:bg-red-600 focus-visible:outline-rose-600")} >
            {children}
        </button>
    );
}

export default Button;