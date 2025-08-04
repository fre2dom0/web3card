import { useAppKitAccount } from "@reown/appkit/react";
import { useState, useEffect } from "react";

useState
const useOwner = (address: string | null) => {
    // If user is owner can switch to edit mode
    const { address: userAddr } = useAppKitAccount(); // Data from wallet manager
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (address === userAddr) setIsOwner(true)
        else setIsOwner(false);
    }, [address, userAddr])

    return isOwner;
}

export default useOwner;