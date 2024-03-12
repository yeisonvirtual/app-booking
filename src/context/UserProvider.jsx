"use client"
import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { getCookie, getCookies } from 'cookies-next';
import { jwtVerify } from 'jose';

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    async function checkLogin(){

      const token = getCookie('token');

      // console.log('token: ',getCookies());
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const secret = new TextEncoder().encode(process.env.SECRET);
      
      try {
        const { payload } = await jwtVerify(token, secret);
        //console.log("userData: ",payload);
        const { id, name, email, type } = payload;

        //console.log('payload: ',payload)

        if (!payload) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser({ id, name, email, type });
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      }

    }

    checkLogin();

  },[]);

  // useEffect(()=>{
  //   console.log('auth: ',isAuthenticated);
  //   console.log('loading: ',isLoading);
  //   console.log('user: ',user);
  // },[isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated }}>
      { children }
    </UserContext.Provider>
  )
}
