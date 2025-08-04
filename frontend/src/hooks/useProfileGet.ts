import { useState, useEffect } from "react";
import { isAddress } from "viem";

import { useGetCid } from "./useCids";
import { fetchIpfs } from "../lib/ipfs";
import { error } from "../utils/toast";

type ProfileGetProps = {
    address: string | undefined;
    urlWalletAddress: string | undefined;
}

type Link = {
    title: string;
    social: string;
    link: string;
    id: string;
}

type Card = {
    address: string | null;
    name: string | null;
    bio: string | null;
    avatar: string | null;
    theme: string[];
    socials: Link[];
};

export const useProfileGet = ({address, urlWalletAddress}: ProfileGetProps) => {
    const cardAddress: string | null = (urlWalletAddress && isAddress(urlWalletAddress)) ? urlWalletAddress: (address ?? null);
    const [uploading, setUploading] = useState(true);
    const [card, setCard] = useState<Card | null>({
        address: null,
        name: null,
        bio: null,
        avatar: null,
        theme: [],
        socials: []
    }); 

    const { data: ipfsData, isFetching, isSuccess, isError, error: getCidErr, refetch } = useGetCid((cardAddress as `0x${string}`));

    /**
     * If there is ipfs data sets card.
     * Else only sets address
    */
    useEffect(() => {
        const handleCard = async () => {
            setUploading(true);
            try {
                if (isSuccess && ipfsData !== '') {
                    const {data} = await fetchIpfs(ipfsData as string);
                    setCard({
                        address: cardAddress ,
                        name: data?.name || null,
                        bio: data?.bio || null,
                        avatar: data?.avatar || null,
                        theme: data?.theme || [],
                        socials: data?.socials || [],
                    })

                    const root = document.documentElement;
                    if (data?.theme) {
                        root.style.setProperty("--color-theme-4", data?.theme[3]);
                        root.style.setProperty("--color-theme-3", data?.theme[2]);
                        root.style.setProperty("--color-theme-2", data?.theme[1]);
                        root.style.setProperty("--color-theme-1", data?.theme[0]);
                        root.style.setProperty("--toastify-icon-color-error", data?.theme[3]);
                        root.style.setProperty("--toastify-color-progress-error", data?.theme[3]);
                    } else {
                        root.style.setProperty("--color-theme-4", '#00FF41');
                        root.style.setProperty("--color-theme-3", '#008F11');
                        root.style.setProperty("--color-theme-2", '#003B00');
                        root.style.setProperty("--color-theme-1", '#0D0208');
                        root.style.setProperty("--toastify-icon-color-error", '00FF41');
                        root.style.setProperty("--toastify-color-progress-error", '00FF41');
                    }

                } else {
                    setCard((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            address: cardAddress
                        };
                    });
                }
            } catch (err) {
                console.log(err);
                error(err as string | object)
            } finally {
                setUploading(false);
            }
        }

        handleCard();
    }, [ipfsData])

    return {
        card,
        cardAddress,
        uploading,
        isError,
        getCidErr,
        refetch,
        isFetching
    }

}