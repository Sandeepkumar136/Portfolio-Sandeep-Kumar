import { createContext, useContext, useState } from "react";

const AlertBoxContext = createContext();

export const AlertBoxContextProvider = ({ children }) => {
  const [isAlertBoxOpen, setIsAlertBoxOpen] = useState(false);
  const OpenAlertBox = () => setIsAlertBoxOpen(true);
  const CloseAlertBox = () => setIsAlertBoxOpen(false);

  return (
    <AlertBoxContext.Provider
      value={{ OpenAlertBox, CloseAlertBox, isAlertBoxOpen }}
    >
      {children}
    </AlertBoxContext.Provider>
  );
};
export const UseAlert = () => useContext(AlertBoxContext);
