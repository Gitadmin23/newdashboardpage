"use client"
import React from "react"; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const liveUrl = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const GoogleAuthContext = React.createContext({} as any);

export const GoogleAuthProvider = (props: any) => {
  // const googleAuth = useGoogleLogin({
  //   clientId: "802643163548-8um3vi6jea67go2j5kib1bt7l5ji0mv4.apps.googleusercontent.com", // Your clientID from Google.
  //   // clientId:  process.env.GOOGLE_CLIENT_ID // Your clientID from Google.
  // }); 
  

  return ( 
    <GoogleOAuthProvider clientId={liveUrl ?? ""}>
      {props.children}
    </GoogleOAuthProvider>
  );
};

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);