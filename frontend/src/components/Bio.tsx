import { ChangeEvent } from "react";

type BioP = {
    bio: string | null;
    maxChar: number;
    className: string
    editMode: boolean;
    setBio: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
}

const Bio = ({ bio, maxChar, className, editMode, setBio, onFocus, onBlur }: BioP) => {
    if (!editMode) return <p className={`${className} text-md text-center`}>{bio || bio?.trim() !== '' ? bio : ''}</p>;
    else {
        return (
            <div className="w-full relative">
                <textarea onFocus={onFocus} onBlur={onBlur} maxLength={maxChar} onChange={(e) => setBio(e)} className={`${className} w-full min-h-30 overflow-x-hidden text-md text-center focus:outline-none focus.`} placeholder={bio ? bio : ''}/>
            </div>
        )
    }
};

export default Bio;
