import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldErrors, UseFormRegister } from "react-hook-form"; // Import react-hook-form types

interface DropzoneProps {
    id: string; // Add name prop for registration
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
    errors: FieldErrors<any>; // Add errors prop
    errorMessage?: string;
}

const ImageUpload: React.FC<DropzoneProps> = ({
    id, // Pass name as a prop
    onChange,
    label,
    value,
    disabled,
    errors, // Pass errors as a prop
    errorMessage
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        };
        reader.readAsDataURL(file);
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
    });

    return (
        <div
            {...getRootProps({ className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700' })}
        >
            <input
                {...getInputProps()}
                id={id} // Use the name prop in the input
            />
            {base64 ? (
                <div className="flex items-center justify-center">
                    <Image src={base64} height="100" width="100" alt="Uploaded image" />
                </div>
            ) : (
                <p className="text-black">{label}</p>
            )}
            {errors[id] && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p> // Display error message if there is an error
            )}
        </div>
    );
}

export default ImageUpload;
