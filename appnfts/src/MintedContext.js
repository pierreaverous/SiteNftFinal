import { createContext, useContext, useState } from 'react';

const MintedContext = createContext();

export const useMinted = () => {
    return useContext(MintedContext);
};

export const MintedProvider = ({ children }) => {
    const [minted, setMinted] = useState({});

    const value = {
        minted,
        setMinted,
    };

    return <MintedContext.Provider value={value}>{children}</MintedContext.Provider>;
};
