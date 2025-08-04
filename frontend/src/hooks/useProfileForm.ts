import { useState } from "react";
import tinycolor from "tinycolor2";

type newLinks = {
    title: string | null;
    social: string | null;
    link: string | null;
    id: string;
}

export const useProfileForm = () => {

    // Personal info

    const [newName, setNewName] = useState<string | null>(null);
    const [nameCharCounter, setNameCharCounter] = useState<number>(0);

    const [newBio, setNewBio] = useState<string | null>(null);
    const [bioCharCounter, setBioCharCounter] = useState<number>(0);

    const [newAvatar, setNewAvatar] = useState<string | null>(null);

    const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameCharCounter(e.target.value.length);
        setNewName(e.target.value);
    }
    
    const handleNewBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioCharCounter(e.target.value.length);
        setNewBio(e.target.value);
    }

    const handleNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = (event) => {
                setNewAvatar(event.target?.result as string);
            };
            
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setNewAvatar('');
    }

    // ---------------------------------------------------------

    // Links

    const [newSocials, setNewSocials] = useState<newLinks[]>([]);
    const [removedSocials, setRemovedSocials] = useState<string[]>([]);

    const addNewSocial = () => {
        setNewSocials((prev) => [...prev, { social: 'X', title: null,  link: null, id: Math.random().toString(16).slice(2) }]);
    };

    const removeNewSocial = (index: number) => {
        setNewSocials((prev) => prev.filter((_, i) => i !== index));
    };

    const updateNewSocial = (index: number, field: keyof newLinks, value: string | null) => {
        setNewSocials((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    // ---------------------------------------------------------

    // Change theme color 
    const [newTheme, setNewTheme] = useState<string[] | null>(null);

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const baseColor = e.target.value; // theme-4
        const tc = tinycolor(baseColor);

        // Diğer renkleri hesapla
        const theme4 = tc.toHexString(); // Ana renk
        const theme3 = tc.darken(10).toHexString(); // Daha koyu
        const theme2 = tc.darken(20).toHexString(); // Daha da koyu
        const theme1 = tc.darken(30).toHexString(); // En koyu
        const themes = [theme1, theme2, theme3, theme4];
        setNewTheme(themes);


        const root = document.documentElement;

        root.style.setProperty("--color-theme-4", theme4);
        root.style.setProperty("--color-theme-3", theme3);
        root.style.setProperty("--color-theme-2", theme2);
        root.style.setProperty("--color-theme-1", theme1);
    };

    return {
        newName,
        nameCharCounter,
        handleNewName,
        newBio,
        bioCharCounter,
        handleNewBio,
        newAvatar,
        handleNewAvatar,
        removeAvatar,
        newSocials,
        addNewSocial,
        removeNewSocial,
        updateNewSocial,
        removedSocials,
        setRemovedSocials,
        newTheme,
        handleThemeChange
    }
}

