import { useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type AvatarP = {
    avatar_url: string | null;
    editMode: boolean;
    setAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removePhoto: () => void;
}

const Avatar = ({ avatar_url, editMode, setAvatar, removePhoto }: AvatarP) => {
    const [isAvatarEditOptionsOpen, setIsAvatarEditOptionsOpen] = useState(false);
    const avatarEditOptions = useRef<HTMLDivElement>(null);
    const uploadAvatarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarEditOptions.current && event.target instanceof Node && !avatarEditOptions.current.contains(event.target)) {
                setIsAvatarEditOptionsOpen(false);
            }
        };
    
        // Add event listener
        if (isAvatarEditOptionsOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        }
    
        // Cleanup event listener
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAvatarEditOptionsOpen]);

    // ---------------------------------------
    const [newAvatar, setNewAvatar] = useState<string | null>(null);
    const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Yeni görsel seçildiğinde base64'e çevir
    const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setSelectedImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Canvas → base64 → File → setAvatar(e) uyumlu event
    const onCropConfirm = () => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;
        setIsAvatarRemoved(false);
        
        const canvas = previewCanvasRef.current;
        const image = imgRef.current;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        canvas.width = completedCrop.width!;
        canvas.height = completedCrop.height!;

        ctx?.drawImage(
            image,
            completedCrop.x! * scaleX,
            completedCrop.y! * scaleY,
            completedCrop.width! * scaleX,
            completedCrop.height! * scaleY,
            0,
            0,
            completedCrop.width!,
            completedCrop.height!
        );

        const base64Image = canvas.toDataURL('image/png');
        const fakeInputEvent = {
            target: {
                files: [dataURLtoFile(base64Image, 'cropped.png')]
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        setAvatar(fakeInputEvent);
        setNewAvatar(base64Image);
        setSelectedImage(null);

    };

    // Yardımcı: base64 string → File
    const dataURLtoFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };


    return (
        <>
            {/* Crop Image */}
            {selectedImage && (
                <div className="fixed mx-auto my-auto top-10 z-50 w-full aspect-square h-full flex justify-center items-center bg-black/70">
                    <div className=" p-4 max-w-120 rounded-lg shadow-lg flex flex-col gap-4">
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={1}
                        >
                            <img
                                ref={imgRef}
                                src={selectedImage}
                                alt="Crop"
                                className="max-h-[60vh]"
                                onLoad={(e) => {
                                    const { width, height } = e.currentTarget;
                                    const crop = centerCrop(
                                        makeAspectCrop({ unit: '%', width: 80 }, 1, width, height),
                                        width,
                                        height
                                    );
                                    setCrop(crop);
                                }}
                            />
                        </ReactCrop>
                        <div className="flex justify-between">
                            <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:underline">Cancel</button>
                            <button onClick={onCropConfirm} className="px-3 py-1 border border-theme-4 rounded-lg hover:bg-theme-4 hover:text-white cursor-pointer">Confirm Crop</button>
                        </div>
                        <canvas ref={previewCanvasRef} className="hidden" />
                    </div>
                </div>
            )}

            {/* Image options */}
            {isAvatarEditOptionsOpen && (
                <div ref={avatarEditOptions} className='absolute top-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-theme-1 flex flex-col gap-2 text-xs px-2 py-2 border border-theme-4 rounded-xl text-nowrap z-40'>
                    <button onClick={() => uploadAvatarRef.current?.click()} className='px-3 py-1 border border-theme-4 rounded-lg cursor-pointer hover:text-white hover:ring'>Add new photo</button>
                    <input onChange={onImageSelected} className='hidden' type='file' ref={uploadAvatarRef} accept="image/*" />
                    <button onClick={() => {removePhoto(); setIsAvatarRemoved(true)}} className='px-3 py-1 border border-theme-4 rounded-lg cursor-pointer hover:text-white hover:ring'>Remove photo</button>
                </div>
            )}

            {/* Avatar */}
            <div className={`relative ${editMode && 'cursor-pointer'}`}>
                {isAvatarRemoved ? (
                    <div onClick={() => { if (editMode) setIsAvatarEditOptionsOpen(!isAvatarEditOptionsOpen) }} className="w-32 h-32 ring-3 ring-theme-4 hover:ring-theme-3 transition duration-200 rounded-full"></div>
                ) : newAvatar ? (
                    <img onClick={() => { if (editMode) setIsAvatarEditOptionsOpen(!isAvatarEditOptionsOpen) }} className='w-32 h-32 ring-3 ring-theme-4 hover:ring-theme-3 transition duration-200 rounded-full object-cover' src={newAvatar} />
                ) : avatar_url && avatar_url.trim() !== '' ? (
                    <img onClick={() => { if (editMode) setIsAvatarEditOptionsOpen(!isAvatarEditOptionsOpen) }} className='w-32 h-32 ring-3 ring-theme-4 hover:ring-theme-3 transition duration-200 rounded-full object-cover' src={avatar_url} />
                ) : (
                    <div onClick={() => { if (editMode) setIsAvatarEditOptionsOpen(!isAvatarEditOptionsOpen) }} className="w-32 h-32 ring-3 ring-theme-4 hover:ring-theme-3 transition duration-200 rounded-full"></div>
                )}

                {editMode && (
                    <span onClick={() => { if (editMode) setIsAvatarEditOptionsOpen(!isAvatarEditOptionsOpen) }} className="absolute top-13 bg-black/50 text-center w-full">Change</span>
                )}
            </div>
        </>
    );
};

export default Avatar;
