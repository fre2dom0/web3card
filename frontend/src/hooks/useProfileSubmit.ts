import { useWaitForTransactionReceipt } from "wagmi";
import { useSetCid } from "./useCids";
import { useState, useEffect } from "react";
import { success, error } from "../utils/toast";
import { setIpfs } from "../lib/ipfs";

type newLinks = {
    title: string | null;
    social: string | null;
    link: string | null;
    id: string
}

type Link = {
    social: string
    title: string;
    link: string;
    id: string;
}

type ProfileSubmitProps = {
    name: string | null,
    newName: string | null;
    bio: string | null;
    newBio: string | null;
    avatar: string | null;
    newAvatar: string | null;
    socials: Link[];
    newSocials: newLinks[];
    removedSocials: string[];
    theme: string[];
    newTheme: string[] | null;
    refetch: () => void;
}

export const useProfileSubmit = ({name, newName, bio, newBio, avatar, newAvatar, socials, newSocials, removedSocials, theme, newTheme, refetch} : ProfileSubmitProps) => {
    const [anyProcess, setAnyProcess] = useState(false);

    const { setCid, isPending, transactionHash } = useSetCid(setAnyProcess);

    // Follow transaction status
    const { isLoading: isConfirming, isSuccess: isConfirmed, isError, error: txErr } = useWaitForTransactionReceipt({
        hash: transactionHash,
        query: {
            enabled: !!transactionHash
        }
    })

    // Check transaction confirmation
    useEffect(() => {
        if (isConfirmed) {
            success(`Profile successfully updated : ${transactionHash}` );
            refetch();
        } else if (isError) {
            error(`An error occurred : ${txErr}` );
        }

        setAnyProcess(false);
    }, [isConfirmed])

    // Upload data to ipfs and generate cid
    const setProfile = async () => {
        try {
            setAnyProcess(true);

            // Filter socials that any field is null
            const filteredSocials = newSocials.filter(s => 
                s.social !== null && s.social !== '' &&
                s.title !== null && s.title !== '' &&
                s.link !== null && s.link !== ''
            );

            const mergedSocials = [...socials, ...filteredSocials];
            const cleanedSocials = mergedSocials.filter(
                item => !removedSocials.includes(item.id)
            );

            console.log(cleanedSocials);

            const data = {
                name: newName === null ? name : newName,
                bio: newBio === null ? bio : newBio,
                avatar: newAvatar === null ? avatar : newAvatar,
                theme: newTheme === null ? theme : newTheme,
                socials: cleanedSocials
            }

            const uris = await setIpfs(data); // Upload data fo IPFS and get CID
            setCid(uris.toString()) // Upload CID to blockchain
            
        } catch (err) {
            console.log(err , typeof err)
            error(err as object | any)
        } finally {
            setAnyProcess(false);
        }
    }   

    return {
        anyProcess,
        isPending,
        isConfirming,
        setProfile
    }
}