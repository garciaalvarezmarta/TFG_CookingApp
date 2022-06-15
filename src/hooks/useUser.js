import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default  function useUser() {
    const authentication = getAuth();

  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  useEffect(() => {
    
  onAuthStateChanged(authentication, (user) => {
        setUser(user);
  });
  }, []);


 
  return user;
}