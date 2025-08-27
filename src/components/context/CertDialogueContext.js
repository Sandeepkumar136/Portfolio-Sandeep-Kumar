import { createContext, useContext, useState } from "react";

const CertDialogueContext = createContext();

export const CertDialogueContextProvider = ({children})=>{
    const [isCertDialogOpen, setICertDialogOpen] = useState(false);
    const openCert = () => setICertDialogOpen(true);
    const closeCert = () => setICertDialogOpen(false);

    return(
        <CertDialogueContext.Provider value={{openCert, closeCert, isCertDialogOpen}}>
            {children}
        </CertDialogueContext.Provider>
    );
};
export const useCert = () => useContext(CertDialogueContext);