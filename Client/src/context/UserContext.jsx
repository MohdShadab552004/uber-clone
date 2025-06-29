import { createContext, useState } from "react";

// Capitalized for convention
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [pickUpLocation,setPickUpLocation] = useState("");
  const [dropLocation,setDropLocation] = useState("");

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, pickUpLocation, setPickUpLocation, dropLocation, setDropLocation}}> 
      {children}
    </UserContext.Provider>
  );
};
