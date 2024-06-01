import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged, updateProfile, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import Home from './Home';
import Messenger from './Messenger';
import PostListing from './PostListing';
import MyProfile from './MyProfile';
import SignInPage from './SignInPage';
import NavBar from './NavBar';
import Footer from './Footer';
import items from '../data/items.json';
import DEFAULT_USERS from '../data/users.json';

export default function App() {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]);
  const [listings, setListings] = useState(items);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    //log in a default user
    // loginUser(DEFAULT_USERS[1])

    const auth = getAuth();



    onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser) {
        console.log("signing in as", firebaseUser.displayName)
        console.log("firebaseuser: ", firebaseUser);
        firebaseUser.userId = firebaseUser.uid;
        firebaseUser.userName = firebaseUser.displayName;
        firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
        console.log("firebaseuser after adding fields :", firebaseUser)
        setCurrentUser(firebaseUser);
      }
      else { //no user
        console.log("signed out");
        setCurrentUser(DEFAULT_USERS[0]);
      }
    })
  }, []);

  const loginUser = async (userObj) => {
    console.log("logging in as", userObj.userName);
    setCurrentUser(userObj);

    if (userObj.userId !== null) {
      navigateTo('/user-listings');

      // Update Firebase user profile
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: userObj.userName,
        photoURL: userObj.userImg,
      });
    }
  };

  const addNewListing = (newListing) => {
    setListings([...listings, newListing]);
  };

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} listings={listings} />} />
        <Route path="/signin" element={<SignInPage currentUser={currentUser} loginFunction={loginUser}/>} />
        <Route element={<ProtectedPage currentUser={currentUser} />}>
          <Route
            path="/messenger"
            element={<Messenger searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          />
          <Route path="/post-listing" element={<PostListing addNewListing={addNewListing} />} />
          <Route path="/user-listings" element={<MyProfile currentUser={currentUser} setCurrentUser={setCurrentUser} searchQuery={searchQuery} listings={listings} />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

function ProtectedPage(props) {
  //...determine if user is logged in
  if(props.currentUser.userId === null) { //if no user, send to sign in
    return <Navigate to="/signin" />
  }
  else { //otherwise, show the child route content
    return <Outlet />
  }
}