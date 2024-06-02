import React, { useState } from 'react';

export default function EditProfileMenu({ currentUser, setCurrentUser, onProfileUpdate }) {
  const [username, setUsername] = useState(currentUser.userName);
  const [location, setLocation] = useState(currentUser.location || '');
  const [profileImg, setProfileImg] = useState(null);

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      userName: username,
      location: location,
      userImg: profileImg ? URL.createObjectURL(profileImg) : currentUser.userImg,
    };
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