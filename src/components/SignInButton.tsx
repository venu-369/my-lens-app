import React from 'react'
import { useAddress, useNetworkMismatch, useNetwork, ConnectWallet, ChainId } from '@thirdweb-dev/react';
import useLensUser from '../lib/auth/useLensUser';
import useLogin from '../lib/auth/useLogin';


type Props = {}

export default function SignInButton({}: Props) {

    const address = useAddress();// detect the connected address
    const isOnWrongNetwork = useNetworkMismatch();//detect ig the user is on thw rong network
    const [, switchNetwork] = useNetwork();//funciton to switch the network
    const {isSignedInQuery, profileQuery} = useLensUser();
    const {mutate: requestLogin} = useLogin()
    //1. user needs to conenct their wallet

    if(!address) {
        return <ConnectWallet />;

    }

   


    //2. user meeds to switch network to polygon
 if(isOnWrongNetwork) {
        return(
            <button
             onClick={() => switchNetwork?.(ChainId.Mumbai)}
             >
                Switch Network
                </button>
        );
    }

    //loading their signed in state
    if(isSignedInQuery.isLoading) {
        return <div>Loading...</div>
    }

    //if the user is not signed in , we need to request a login
    if(!isSignedInQuery.data) {
        return (
            <button onClick={() => requestLogin()}>Sign in with Lens</button>
        )
    }

    //loading their profile info
    if(profileQuery.isLoading) {
        return <div>Loading...</div>;
    }

    //if its done laoding and there's no default profile
    if(!profileQuery.data?.defaultProfile) {
        return <div>No Lens Profile</div>
    }

    //if its done laoding and theres a profile
    if(profileQuery.data?.defaultProfile) {
        return<div>Hello {profileQuery.data?.defaultProfile?.handle}!</div>;
    }

    return  (
        <div>
            Something went wrong
        </div>
    )
    
  
  
}