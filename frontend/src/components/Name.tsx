import { ChangeEvent } from "react";

type NameP = {
    name: string | null;
    maxChar: number;
    className: string;
    editMode: boolean;
    setName: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
}

const Name = ({ name, maxChar, className, editMode, setName, onFocus, onBlur }: NameP) => {
    if (!editMode) return <h1 className={`${className} text-2xl font-semibold text-nowrap`}>{name || name?.trim() !== '' ? name : ''}</h1>;
    else {
        return <input onFocus={onFocus} onBlur={onBlur} maxLength={maxChar} onChange={(e) => setName(e)} className={`${className} w-full text-center text-2xl font-semibold focus:outline-none`} placeholder={name ? name : ''} />
    }
};

export default Name;focus
