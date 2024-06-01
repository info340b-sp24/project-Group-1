import React from 'react';
import { Navigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider, EmailAuthProvider, getAuth } from 'firebase/auth'



export default function SignInPage(props) {
  const { currentUser, loginFunction } = props;

  const configObj = {
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID
      }
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => false
    },
    credentialHelper: 'none'
  }

  const auth = getAuth(); //the authenticator

  if (currentUser?.userId) { //if signed in
    return <Navigate to="/user-listings" />
  }

  return (
    <div className="card bg-light">
      <div className="container card-body">
        <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
      </div>
    </div>
  )
}