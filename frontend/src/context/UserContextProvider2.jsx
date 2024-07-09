import React,{useState} from "react";

import UserContext from "./UserContext";

export default function UserContextProvider({children}){
    let [count ,setCount]=useState(false)
    let [login ,setlogin]=useState('')


    return(
        <UserContext.Provider value={{count ,setCount, login,setlogin}}>
            {children}
        </UserContext.Provider>
    )

}