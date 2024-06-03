import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

export default function EditProfileMenu({ currentUser, setCurrentUser, onProfileUpdate }) {
  const [username, setUsername] = useState(currentUser.userName);
  const [location, setLocation] = useState(currentUser.location || '');
  const [profileImg, setProfileImg] = useState(null);

  const handleSave = () => {
    // if (!currentUser.id) {
    //   console.error('User ID is undefined');
    //   return;
    // }

    const updatedUser = {
      ...currentUser,
      userName: username,
      location: location,
      userImg: profileImg ? URL.createObjectURL(profileImg) : currentUser.userImg,
    };

    const db = getDatabase();
    set(ref(db, 'users/' + currentUser.userId), {
      email: currentUser.email,
      username: username,
      location: location,
      userImg: updatedUser.userImg,
    }).then(() => {
      console.log('User data updated in Firebase');
    }).catch((error) => {
      console.error('Error updating user data in Firebase:', error);
    });

    onProfileUpdate(updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <div className="edit-profile-menu">
      <input 
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImg(e.target.files[0])}
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}
