import { useReadContract, useWriteContract} from "wagmi"
import contract from '../constants/contract.json'
import { useState } from "react";



export const useGetCid = (address: `0x${string}`) => {
    return useReadContract({
        abi: contract.abi,
        address: contract.address,
        functionName: 'getCid',
        args: [address],
        query: {
            enabled: address !== null,
            retry: 3,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: true,
        }
    });
};

export const useSetCid = (setAnyProcess: (state: boolean) => void) => {
    const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>()
    
    const { writeContract, data, isPending, isError, error, isSuccess } = useWriteContract({
        mutation: {
            onSuccess: (result) => {
                console.log('Transaction sent:', result);
                setTransactionHash(result as `0x${string}`);
            },
            onError: (error) => {
                console.error('Transaction error:', error);
                setAnyProcess(false);
            }
        }
    });

    const setCid = (cid: string) => {
        writeContract({
            abi: contract.abi,
            address: contract.address,
            functionName: 'setCID',
            args: [cid]
        })
    }

    return { 
        setCid, 
        data, 
        isPending, 
        isError, 
        error, 
        isSuccess,
        transactionHash // Return transacation hash to confirm
    };
}