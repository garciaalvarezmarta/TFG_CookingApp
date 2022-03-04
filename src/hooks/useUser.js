import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

//Para saber en que estado va a estar el usuario
export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined
};

export default function useUser(){
    //Inicialmente no se sabe en qué estado está el usuario
    const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
    
}