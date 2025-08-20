import { createContext, useContext, useState } from "react";

const FilterDialogueBoxContext = createContext();

export const FilterDialogueBoxProvider = ({children})=>{
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);

    return(
        <FilterDialogueBoxContext.Provider value={{openFilter, closeFilter, isFilterOpen}}>
            {children}
        </FilterDialogueBoxContext.Provider>
    )


}
export const useFilter = () => useContext(FilterDialogueBoxContext);