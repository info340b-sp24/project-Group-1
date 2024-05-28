import React from 'react';
import { Navigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider, EmailAuthProvider, getAuth } from 'firebase/auth'


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
    signInSuccessWithAuthResult: () => false //don't do anything special on signin
  },
  credentialHelper: 'none'
}

export default function SignInPage(props) {
  const currentUser = props.currentUser;
  const loginFunction = props.loginCallback;

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