import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select'
import { Link } from 'react-router-dom';

import { IconType } from 'react-icons/lib';
import { IoRemoveCircle } from "react-icons/io5";
import {
    FaXTwitter,
    FaGithub,
    FaInstagram,
    FaFacebook,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaDiscord,
    FaReddit,
    FaSnapchat,
    FaTwitch,
    FaTelegram,
    FaWhatsapp,
    FaPinterest,
    FaThreads,
    FaDribbble,
    FaBehance,
    FaMedium,
    FaSlack,
    FaSkype,
    FaSteam,
    FaTumblr,
    FaWeibo,
    FaVimeo,
    FaSoundcloud,
    FaMastodon,
    FaStackOverflow,
    FaGoogle,
    FaApple,
} from "react-icons/fa6";

type newLink = {
    title: string | null;
    social: string | null;
    link: string | null;
    id: string;
}

type Link = {
    social: string
    title: string;
    link: string;
    id: string;
}

type LinksP = {
    socials: Link[];
    newSocials: newLink[];
    removeNewSocial: (index: number) => void;
    updateNewSocial: (index: number, field: keyof newLink, value: string | null) => void;
    setRemovedSocials: Dispatch<SetStateAction<string[]>>;
    className: string;
    editMode: boolean;
};

type SocialsList = {
    label: ReactElement<IconType>;
    value: string;
};

const socialsList: SocialsList[] = [
    { label: <FaXTwitter />, value: "X" },
    { label: <FaGithub />, value: "Github" },
    { label: <FaInstagram />, value: "Instagram" },
    { label: <FaFacebook />, value: "Facebook" },
    { label: <FaLinkedin />, value: "Linkedin" },
    { label: <FaYoutube />, value: "Youtube" },
    { label: <FaTiktok />, value: "Tiktok" },
    { label: <FaDiscord />, value: "Discord" },
    { label: <FaReddit />, value: "Reddit" },
    { label: <FaSnapchat />, value: "Snapchat" },
    { label: <FaTwitch />, value: "Twitch" },
    { label: <FaTelegram />, value: "Telegram" },
    { label: <FaWhatsapp />, value: "Whatsapp" },
    { label: <FaPinterest />, value: "Pinterest" },
    { label: <FaThreads />, value: "Threads" },
    { label: <FaDribbble />, value: "Dribbble" },
    { label: <FaBehance />, value: "Behance" },
    { label: <FaMedium />, value: "Medium" },
    { label: <FaSlack />, value: "Slack" },
    { label: <FaSkype />, value: "Skype" },
    { label: <FaSteam />, value: "Steam" },
    { label: <FaTumblr />, value: "Tumblr" },
    { label: <FaWeibo />, value: "Weibo" },
    { label: <FaVimeo />, value: "Vimeo" },
    { label: <FaSoundcloud />, value: "Soundcloud" },
    { label: <FaMastodon />, value: "Mastodon" },
    { label: <FaStackOverflow />, value: "Stackoverflow" },
    { label: <FaGoogle />, value: "Google" },
    { label: <FaApple />, value: "Apple" },
];


const Links = ({ socials, newSocials, updateNewSocial, removeNewSocial, setRemovedSocials, className, editMode }: LinksP) => {

    const [activeSocials, setActiveSocials] = useState(socials);

    useEffect(() => {

    }, [socials]);

    return (
        <ul
            className={`
                ${className}
                w-full flex flex-col gap-3
                overflow-y-auto box-border
                scroll-smooth transition-all duration-300
                ${editMode ? 'h-[200px]' : 'h-[230px]'}
            `}
        >   

            {editMode && newSocials && newSocials.map((n, i) => (
                <li 
                key={n.id}
                className="w-full px-4 py-4 pl-1 flex justify-center border-3 border-gray-600/50 rounded-2xl"
                >   
                    <div className='flex items-center'>
                        <Select
                        isSearchable={true}
                        defaultValue={socialsList[0]}
                        options={socialsList}
                        className="text-2xl hover:text-black"
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                            ...base,
                                backgroundColor: "transparent", // veya istediğin renk
                                border: 'none',
                            }),
                            indicatorSeparator: () => ({ display: "none" }), // dikey çizgiyi kaldır
                            dropdownIndicator: () => ({ display: "block", backgroundColor: 'none' }), // sağdaki ok simgesini kaldır
                            menu: (base) => ({
                                ...base,
                                backgroundColor: "black", // dropdown menü rengi
                                zIndex: 10,
                                
                            }),
                            menuList: (base) => ({
                                ...base,

                            }),
                            valueContainer: (base) => ({
                                ...base,
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: 'white',
                                border: 'none',
                                zIndex: '1',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? "var(--color-theme-3)" : "transparent",
                                color: "var(--color-theme-4)",
                                cursor: "pointer",
                                '&:hover': {
                                    color: "white",
                                },
                            }),
                        }}
                        onChange={(selected) => {
                            if (selected) {
                                updateNewSocial(i, "social", selected.value);
                            }
                        }}
                        />
                    </div>

                    <div className=' flex flex-col  gap-1 my-2 mx-auto w-full'>
                        <input onChange={(e) => updateNewSocial(i, "link", e.target.value)} className='text-center focus:outline-none pr-10 pl-3 focus:text-theme-3' placeholder='Url'/>
                        <input onChange={(e) => updateNewSocial(i, "title", e.target.value)} className='text-center focus:outline-none pr-10 pl-3 focus:text-theme-3' placeholder='Title'/>
                    </div>

                    <div className='flex items-center'>
                        <span onClick={() => removeNewSocial(i)} className='cursor-pointer hover:text-theme-4 transition duration-300'><IoRemoveCircle /></span>
                    </div>

                </li>
            ) )}

            {activeSocials && activeSocials.map(s => {
                const matched = socialsList.find(
                    (sl) => sl.value.toLowerCase() === s.social.toLowerCase()
                );
                const Icon = matched?.label;

                return (
                    <li
                        key={s.id}
                        className="w-full px-4 py-4 flex justify-center border-3 border-theme-4 rounded-2xl"
                    >   
                        <Link
                            to={s.link}
                            target="_blank"
                            className="flex w-full ring-0 outline-none hover:border-theme-2 transition duration-300 ease-in-out"
                        >
                            <div className="flex items-center text-2xl">
                                {Icon && Icon}
                            </div>
                            <span className="flex items-center mx-auto text-center">{s.title}</span>

                        </Link>
                        {editMode && (
                            <div onClick={() => {
                                    setRemovedSocials(prev => [...prev, s.id])
                                    setActiveSocials((data) => data.filter(d => d.id !== s.id))
                                }} className='flex items-center cursor-pointer hover:text-theme-3'>
                                <span className='text-inherit hover:text-inherit transition duration-300'><IoRemoveCircle /></span>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Links;