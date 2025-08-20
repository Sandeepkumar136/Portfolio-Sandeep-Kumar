import { createContext, useContext, useState } from "react";

const LangDialogueboxContext = createContext();

export const LangDialogueboxProvider = ({children})=>{
    const [isLangOpen, setIsLangOpen] = useState(false);
    const openLang = () => setIsLangOpen(true);
    const closeLang = () => setIsLangOpen(false);

    return(
        <LangDialogueboxContext.Provider value={{openLang, closeLang, isLangOpen}}>
            {children}
        </LangDialogueboxContext.Provider>
    )


}
export const useLang = () => useContext(LangDialogueboxContext);