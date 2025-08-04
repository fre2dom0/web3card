import { download, upload } from "thirdweb/storage";
import { getClient } from '../utils/client';


/**
 * Fetch data from ipfs if exists
 * @param ipfs 
 * @returns {object}
 */
export const fetchIpfs = async (ipfs: string) => {
    const client = getClient();

    const response = await download({
        client,
        uri: ipfs,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch IPFS data: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export const setIpfs = async (data: object) => {
    try {
        const client = getClient();
        const uris = await upload({
            client,
            files: [
                {
                    name: "Web3Card",
                    data
                },
            ],
        })

        return uris.toString();
    } catch (err) {
        throw err;
    }
}