import React, { useState, useEffect } from 'react';
import EditProfileMenu from './EditProfileMenu';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function MyProfile({ currentUser, setCurrentUser, searchQuery, listings }) {
  const [EditMenuOpen, setEditMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch data from Firebase
    const db = getDatabase();
    const userRef = ref(db, 'users/' + currentUser.userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentUser(prevUser => ({ ...prevUser, ...data }));
      }
    });
  }, [currentUser.id, setCurrentUser]);

  const toggleEditMenu = () => {
    setEditMenuOpen(!EditMenuOpen);
  }

  const handleProfileUpdate = (updatedUser) => {
    console.log('Profile Updated:', updatedUser)
    setCurrentUser(updatedUser);
    setEditMenuOpen(false);
  }

  return (
    <>
        <main>
          <section className="my-items">
            <div className="user-info">
            <img src={currentUser.userImg} alt="User Avatar" className="user-avatar" />
              <div className="user-details">
                <h2 className="username">{currentUser.userName}</h2>
                <p className="joined-date">Joined Apr 2024</p>
                <p className="location">{currentUser.location}</p>
                <button onClick={toggleEditMenu}>Edit Profile</button>
              </div>
            </div>
          </section>
        </main>
        {EditMenuOpen && (
          <EditProfileMenu
            currentUser={currentUser}
            onProfileUpdate={handleProfileUpdate}
            setCurrentUser={setCurrentUser}
          />
        )}
      </>
  );
}

