'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any
}

const uploadPreset = "ouasm2ov";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onOpen={() => {
                toast.loading("Opening upload widget...");
            }}
            onDisplayChanged={() => {
                toast.dismiss();
            }}
            // onQueuesStart={() => console.log("onQueuesStart")}
            onUploadAdded={() => {
                toast.loading("Uploading...");
            }}
            onSourceChanged={() => console.log("onSourceChanged")}
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    src={value}
                                    alt="House"
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;