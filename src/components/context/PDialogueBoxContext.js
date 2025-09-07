import { createContext, useContext, useState } from "react";

const PDialogueBox = createContext();

export const PDialogueBoxProvider = ({children})=>{
    const [isPDiaOpen, setIsPDiaOpen] = useState(true);
    const openPDia = () => setIsPDiaOpen(true);
    const closePDia = () => setIsPDiaOpen(false);

    return(
        <PDialogueBox.Provider value={{openPDia, closePDia, isPDiaOpen}}>
            {children}
        </PDialogueBox.Provider>
    )


}
export const usePDia = () => useContext(PDialogueBox);