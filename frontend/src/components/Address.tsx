type AddressP = {
    address: string | null;
    editMode: boolean
    className: string;
}

const Address = ({ address, editMode, className }: AddressP) => {
    return (
        <div className={`
            transform origin-top transition duration-300 
            ${editMode ? '-translate-y-10' : '-translate-y-0 mb-5'} `}>
            <p className={`${className}text-xs text-center`}>{address || address?.trim() !== '' ? address : 'No Address'}</p>
        </div>  
    )
};

export default Address;
