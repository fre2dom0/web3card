import { IoMdAddCircle, IoMdSettings } from "react-icons/io";
import { IconType } from "react-icons/lib";

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
import { useRef } from "react";


type SettingsP = {
    editMode: boolean;
    addNewSocial: () => void;
    handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type SocialsList = {
    social: string;
    icon: IconType;
};

const socialsList: SocialsList[] = [
    { social: "X", icon: FaXTwitter },
    { social: "Github", icon: FaGithub },
    { social: "Instagram", icon: FaInstagram },
    { social: "Facebook", icon: FaFacebook },
    { social: "LinkedIn", icon: FaLinkedin },
    { social: "YouTube", icon: FaYoutube },
    { social: "TikTok", icon: FaTiktok },
    { social: "Discord", icon: FaDiscord },
    { social: "Reddit", icon: FaReddit },
    { social: "Snapchat", icon: FaSnapchat },
    { social: "Twitch", icon: FaTwitch },
    { social: "Telegram", icon: FaTelegram },
    { social: "WhatsApp", icon: FaWhatsapp },
    { social: "Pinterest", icon: FaPinterest },
    { social: "Threads", icon: FaThreads },
    { social: "Dribbble", icon: FaDribbble },
    { social: "Behance", icon: FaBehance },
    { social: "Medium", icon: FaMedium },
    { social: "Slack", icon: FaSlack },
    { social: "Skype", icon: FaSkype },
    { social: "Steam", icon: FaSteam },
    { social: "Tumblr", icon: FaTumblr },
    { social: "Weibo", icon: FaWeibo },
    { social: "Vimeo", icon: FaVimeo },
    { social: "SoundCloud", icon: FaSoundcloud },
    { social: "Mastodon", icon: FaMastodon },
    { social: "StackOverflow", icon: FaStackOverflow },
    { social: "Google", icon: FaGoogle },
    { social: "Apple", icon: FaApple },
];

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