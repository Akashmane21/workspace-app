import { useState, createContext, useContext } from "react";

const Globaldata = createContext();

export const useCounter = () => useContext(Globaldata);

function GlobaldataProider(props) {
 
  const [isTheme, setisTheme] = useState(false)
 const [isMenu, setisMenu] = useState(false)



  const value = { isTheme,setisTheme , isMenu, setisMenu};

  return (
    <Globaldata.Provider value={value}>{props.children}</Globaldata.Provider>
  );
}

export default GlobaldataProider;
