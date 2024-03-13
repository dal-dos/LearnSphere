import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css"; // Import CSS for styling

function Profile() {
  let { postSlug } = useParams();

  // Dummy profile data
  const [profileData, setProfileData] = useState({
    profileName: "John Doe",
    profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    profileBio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget libero et nisi luctus semper.",
    followedTeachers: ["Teacher 1", "Teacher 2", "Teacher 3"]
  });

  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler to toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handler to update profile data
  const handleProfileUpdate = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="Profile">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-lg-0"
              src={profileData.profilePicture}
              alt={profileData.profileName}
              width="400"
              height="400"
            />
            <button className="follow-button">
              Follow
            </button>
          </div>
          <div className="col-lg-5">
            {isEditing ? (
              <form>
                <input
                  type="text"
                  name="profileName"
                  value={profileData.profileName}
                  onChange={handleProfileUpdate}
                />
                <textarea
                  name="profileBio"
                  value={profileData.profileBio}
                  onChange={handleProfileUpdate}
                />
                <button type="button" onClick={handleEditToggle}>Save</button>
              </form>
            ) : (
              <>
                <h1 className="font-weight-light">{profileData.profileName}</h1>
                <p>{profileData.profileBio}</p>
                <div className="followed-teachers">
                  <h2>Followed Teachers:</h2>
                  <ul>
                    {profileData.followedTeachers.map((teacher, index) => (
                      <li key={index}>{teacher}</li>
                    ))}
                  </ul>
                </div>
                <button type="button" onClick={handleEditToggle}>Edit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;