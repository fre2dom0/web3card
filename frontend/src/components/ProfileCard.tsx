import { useState } from 'react';
import { CiBookmark } from "react-icons/ci";


import Avatar from './Avatar';
import Name from './Name';
import Bio from './Bio';
import Address from './Address';
import useOwner from '../hooks/useOwner';

import { useProfileForm } from '../hooks/useProfileForm';
import { useProfileSubmit } from '../hooks/useProfileSubmit';
import Settings from './Settings';
import Links from './Links';

type Link = {
    social: string
    title: string;
    link: string;
    id: string;
}

type ProfileProps = {
    profile: {
        address: string | null;
        name: string | null;
        bio: string | null;
        avatar: string | null;
        theme: string[];
        socials: Link[];
    };
    refetch: () => void
};

const ProfileCard: React.FC<ProfileProps> = ({ profile, refetch }) => {

    // Prop
    const { name, address, bio, avatar, theme, socials } =  profile; // Data from prop

    // Hooks
    const { newName, nameCharCounter, handleNewName, newBio, bioCharCounter, handleNewBio, newAvatar, handleNewAvatar, removeAvatar, newSocials, addNewSocial, removeNewSocial, updateNewSocial, removedSocials, setRemovedSocials, newTheme, handleThemeChange } = useProfileForm();
    const { anyProcess, isPending, isConfirming, setProfile } = useProfileSubmit({name, newName, bio, newBio, avatar, newAvatar, socials, newSocials, removedSocials, theme, newTheme, refetch});
    const isOwner = useOwner(address);

    // Animations & Design
    const [editMode, setEditMode] = useState(false);
    const [bookmarkDown, setBookmarkDown] = useState(true);
    const [focusedField, setFocusedField] = useState<'name' | 'bio' | null>(null);

    return (
        <div style={{minHeight: 'inherit'}} className={`relative w-full flex flex-col justify-between gap-2 text-wrap overflow-y-hidden transition-all duration-300 ${isPending || isConfirming || anyProcess || editMode ? 'pt-0' : 'pt-5'}`}>
            {anyProcess || isPending || isConfirming ? (
                <div className='flex items-center gap-5 my-auto mx-auto'>
                    <div role="status" className='my-auto'>
                        <svg aria-hidden="true" className="w-8 h-8 animate-spin dark:text-gray-600 fill-theme-4" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className='text-theme-4 text-center sm:text-lg lg:text-xl'>Waiting for confirmation...</span>
                </div>
            ) : ( 
                <>
                    <div className='relative flex flex-col w-full'>
                        <Address className='' editMode={editMode} address={address} />
                        <div className='flex flex-col items-center px-5 transition-all duration-300'>
                            
                            <Avatar removePhoto={removeAvatar} setAvatar={(e) => handleNewAvatar(e)} editMode={editMode} avatar_url={avatar}/>
                                
                            <div className='relative'>
                                <Settings handleThemeChange={handleThemeChange} addNewSocial={addNewSocial} editMode={editMode} />
                                <Name onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} maxChar={18} setName={(e) => handleNewName(e)} editMode={editMode} className='' name={name} />
                                
                                {/* Text length indicator */}
                                {editMode&& (
                                    <span className='absolute bottom-11 right-0'>{focusedField === 'name' ? `${nameCharCounter}/18` : focusedField === 'bio' && `${bioCharCounter}/160`}</span>
                                )}
                            </div>
                            <Bio onFocus={() => setFocusedField('bio')} onBlur={() => setFocusedField(null)}  maxChar={160} setBio={(e) => handleNewBio(e)}  editMode={editMode} className='' bio={bio}/>
                            <Links className='w-full mt-5' setRemovedSocials={setRemovedSocials} removeNewSocial={removeNewSocial} updateNewSocial={updateNewSocial} newSocials={newSocials} socials={socials} editMode={editMode} />
                        </div>
                    </div>

                    {/* Set profile button (if edit mode active) */}
                    <div
                        className={`
                            px-5 
                            transition-all duration-500 ease transform 
                            ${editMode 
                            ? '-translate-y-10 mt-5' 
                            : 'pointer-events-none translate-y-15'}
                        `}
                        >
                        <button
                            disabled={isConfirming || isPending || anyProcess}
                            onClick={() => setProfile()}
                            className={`
                            w-full px-5 py-2 text-white rounded-xl cursor-pointer
                            focus:outline-none ring ring-theme-4 hover:ring-theme-2 transition-all duration-300
                            `}
                        >
                            Set Profile
                        </button>
                    </div>
                    
                    {/* Edit mode button (Only owner can see it) */}
                    {isOwner && (
                        <button
                        onClick={() => {
                            setEditMode(!editMode);
                            setBookmarkDown(false);
                            setTimeout(() => setBookmarkDown(true), 200);
                        }}
                        className={`absolute ${bookmarkDown ? '-bottom-4' : 'bottom-0'} 
                            right-1/12 rotate-180 text-theme-4 hover:text-theme-2 text-5xl transition-all duration-500 cursor-pointer`}
                        >
                        <CiBookmark />
                        </button>
                    )}
                </>
            )}


        </div>
    );
}

export default ProfileCard;
