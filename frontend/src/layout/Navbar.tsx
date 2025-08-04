import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { isAddress, zeroAddress } from "viem";
import { error } from "../utils/toast";



const Navbar = () => {
    const { open } = useAppKit();
    
    const { disconnect } = useDisconnect();
    const { isConnected } = useAppKitAccount();

    // Reset all colors
    useEffect(() => {
        if (!isConnected) {
            const root = document.documentElement;
            root.style.setProperty("--color-theme-4", '#00FF41');
            root.style.setProperty("--color-theme-3", '#008F11');
            root.style.setProperty("--color-theme-2", '#003B00');
            root.style.setProperty("--color-theme-1", '#0D0208');
        }
    }, [isConnected])


    // Design
    const [toggleMobileSearch, setToggleMobileSearch] = useState(false);
    const mobileSearchInputRef = useRef<HTMLInputElement>(null);
    const desktopSearchInputRef = useRef<HTMLInputElement>(null);


    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
    const menuRef = useRef<HTMLInputElement>(null);

    // Close menu when clicked
    useEffect(() => {
        const handleClickOutside = () => {
            setToggleProfileMenu(false);
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleMobileSearch = () => {
        setToggleMobileSearch(!toggleMobileSearch)
        mobileSearchInputRef.current?.focus();
    }
    //--------------------------------------------

    const navigate = useNavigate();

    const [searchedWallet, setSearchedWallet] = useState<`0x${string}` | string>(zeroAddress)
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedWallet(e.target.value);
    }

    const search = () => {
        if (isAddress(searchedWallet)) {
            navigate(`/${searchedWallet}`);
            if (desktopSearchInputRef.current) {
                desktopSearchInputRef.current.value = '';
            }
            
            if (mobileSearchInputRef.current) {
                mobileSearchInputRef.current.value = '';

            }
            setToggleMobileSearch(false);
        }
        else if (searchedWallet === '') {
            navigate('/');
            setToggleMobileSearch(false);
        }
        else error('Please enter a correct address');


    }

    return (
        <nav className="fixed flex flex-col w-full z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 min-h-12 bg-theme-1 border border-r-0 border-l-0 border-theme-4 shadow-2xl shadow-theme-2">
                {/* Logo */}
                <div className="flex justify-start sm:justify-center items-center col-span-1">
                    <span className="text-xl sm:text-2xl text-theme-4 font-extrabold ml-5">Web3Card</span>
                </div>
                {/* Desktop Search */}
                <div className="hidden sm:flex justify-end items-center py-2 px-3 col-span-2">
                    <input ref={desktopSearchInputRef} onKeyDown={(e) => {if (e.key === 'Enter') search()}} onChange={(e) => handleSearch(e)} className="
                        bg-white text-theme-2 text-sm shadow-xl h-full sm:w-3/4 md:w-full py-0 px-3 rounded-xl rounded-r-none
                        transition duration-300 focus:bg-theme-2 focus:text-theme-4 focus:outline-none focus:ring-1" type="search" name="sWallet" id="sWallet" />
                    <button onClick={() => search()} className="
                        bg-white text-theme-2 text-lg shadow-xl h-full py-2 px-3 rounded-xl sm:rounded-l-none cursor-pointer
                        transition duration-300 hover:bg-theme-2 hover:text-theme-4 hover:ring-1"><FaSearch /></button>
                </div>

                {/* Profile */}
                <div className="flex justify-end sm:justify-center items-center col-span-1">
                    <button onClick={() => handleToggleMobileSearch()} className={`
                        text-2xl sm:text-2xl text-white mr-4 cursor-pointer sm:hidden 
                        transition duration-300
                        ${toggleMobileSearch ? 'rotate-180' : 'rotate-0'}`}><FaSearch /></button>
                    
                    <button onClick={() => setToggleProfileMenu(!toggleProfileMenu)} className={`
                    min-w-8 min-h-8 sm:min-w-10 sm:min-h-10 border border-white rounded-full text-xs mr-5
                    ${isConnected ? 'bg-radial-[at_50%_75%] from-theme-4 to-theme-3' :
                    'bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%'
                    }`}></button>
                </div>
            </div>

            {/* Menu */}
            <div ref={menuRef} className={`
                sm:grid sm:grid-cols-4
                overflow-hidden transition-all duration-500 ease transform origin-top 
                ${toggleProfileMenu ? 'max-h-40 scale-y-100' : 'max-h-0 scale-y-0'}
                
                `}>
                <div className=""></div>
                <div className=""></div>
                <div className=""></div>
                <div className="bg-theme-2 col-span-4 sm:col-span-1 mx-0 sm:mr-1 px-2 py-3 mt-0 flex justify-center items-center rounded-3xl rounded-t-none border border-t-0 text-center text-theme-4">
                    <ul className="cursor-pointer w-3/4 flex flex-col gap-y-2">
                        {isConnected && (
                            <>
                                <li className="hover:text-white transition duration-300" onClick={() => navigate('/')}>Go to Profile</li>
                                {/* <li className="hover:text-white transition duration-300" onClick={() => }>Edit Profile</li> */}
                            </>
                        )}
                        <li className="hover:text-white transition duration-300" onClick={() => open()}>{isConnected ? 'See Wallet' : 'Connect Wallect'} </li>
                        {isConnected && (
                            <li className="hover:text-white transition duration-300" onClick={() => disconnect()}>Disconnect</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Mobile Search */}
            <div className={`
                sm:hidden overflow-hidden transition-all duration-300 ease-in-out transform origin-left 
                ${toggleMobileSearch ? 'max-h-15 scale-y-100' : 'max-h-0 scale-y-0'}
            `}>
                <div className="flex h-15 px-10 py-2 mt-2">
                    <input onKeyDown={(e) => {if (e.key === 'Enter') search()}} onChange={(e) => handleSearch(e)} className="bg-white text-theme-2 shadow-xl text-md h-full w-full py-2 px-3 rounded-xl rounded-r-none
                    transition duration-300 focus:bg-none focus:bg-theme-1 focus:ring focus:text-theme-4 focus:outline-none" 
                    type="search" name="sWallet" id="sWallet" ref={mobileSearchInputRef} />
                    
                    <button onClick={() => search()} className="bg-white text-theme-2 shadow-xl text-xl h-full py-2 px-3 rounded-xl rounded-l-none cursor-pointer 
                    transition duration-300 hover:bg-theme-2 hover:text-theme-4 focus:bg-none focus:bg-theme-1 focus:ring focus:text-theme-4">
                        <FaSearch />
                    </button>
                </div>
            </div>


        </nav>
    )
}

export default Navbar;