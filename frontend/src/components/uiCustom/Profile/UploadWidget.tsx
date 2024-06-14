import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';

const CloudinaryUploadWidget = ({setUploadedImageUrl}:{setUploadedImageUrl:Dispatch<SetStateAction<string>>}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-ignore
            const myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dywebzylz', // Replace with your Cloudinary cloud name
                uploadPreset: 'xzsnd6c8', // Replace with your Cloudinary upload preset
                showUploadMoreButton: true,
                singleUploadAutoClose: false
            }, (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    const uploadedFileUrl = result.info.secure_url;
                    console.log('File uploaded successfully:', uploadedFileUrl);
                    // You can handle the uploaded file URL here
                    setUploadedImageUrl(uploadedFileUrl);
                } else if (error) {
                    console.error('Upload error:', error);
                }
            });

            document.getElementById('upload_button')?.addEventListener('click', () => {
                myWidget.open();
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <Button id="upload_button">Upload Image</Button>
        </div>
    );
};

export default CloudinaryUploadWidget;
