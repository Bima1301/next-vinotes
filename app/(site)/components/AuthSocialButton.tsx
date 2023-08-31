'use client';
import { IconType } from "react-icons";
type AuthSocialButtonProps = {
    icon: IconType;
    onClick: () => void;
    children?: React.ReactNode;
}
const AuthSocialButton = ({ icon: Icon, onClick, children }: AuthSocialButtonProps) => {
    return (
        <button type="button" onClick={onClick} className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
            {children}
            <Icon />
        </button>
    );
}

export default AuthSocialButton;