import { IoMdAddCircle, IoMdSettings } from "react-icons/io";

import { useRef } from "react";


type SettingsP = {
    editMode: boolean;
    addNewSocial: () => void;
    handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Settings = ({editMode, addNewSocial, handleThemeChange}: SettingsP) => {

    const colorRef = useRef<HTMLInputElement>(null);

    return (
        <div className={`
            flex justify-center gap-2 transform transition-all duration-300 
            ${editMode ? 'scale-100 opacity-100 mt-6 mb-3' : 'scale-0 opacity-0 my-0'}
            `}>
            <IoMdAddCircle onClick={() => addNewSocial()} className='rounded-full text-2xl hover:text-theme-4 transition duration-300 cursor-pointer' />
            <IoMdSettings onClick={() => colorRef.current?.click()} className='rounded-full text-2xl hover:text-theme-4 transition duration-300 cursor-pointer' />
            <input onChange={(e) => handleThemeChange(e)} ref={colorRef} className="hidden" type="color" />
            {/* <ul className="absolute top-0 grid grid-cols-6 gap-6 bg-theme-1 border border-theme-4 rounded-xl p-3">
                {socialsList.map((s, i) => (
                    <li key={i}>
                        {<s.icon />}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default Settings;