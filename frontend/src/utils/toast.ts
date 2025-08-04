import { toast, Slide } from 'react-toastify';


export const success = (msg: string) => {
    return (
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: 'bg-theme-1 border border-theme-4 text-white',
            transition: Slide,
        })
    )
}

export const error = (err: string | object) => {
    return (
        toast.error(`${err}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: 'bg-theme-1 border border-theme-4 text-white',
            transition: Slide,
        })
    )
}