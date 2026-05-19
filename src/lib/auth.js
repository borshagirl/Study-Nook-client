
// import dns from "node:dns/promises"
// dns.setServers(['8.8.8.8', '1.1.1.1'])

import { authClient } from "./auth-client";

export const signUpUser = async(data)=>{

    return await authClient.signUp.email({

        name:data.name,

        email:data.email,

        password:data.password,

        image:data.image

    });

};


export const signInUser = async(data)=>{

    return await authClient.signIn.email({

        email:data.email,

        password:data.password

    });

};



export const signOutUser = async () => {

    return await authClient.signOut();

};



export const signInGoogle = async () => {

    return await authClient.signIn.social({

        provider:"google"

    });

};