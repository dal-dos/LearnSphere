import React, { useEffect } from "react";
import { useParams } from "react-router";

function Profile() {
  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  return (
    <div className="Profile">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Profile</h1>
            <p>
              {postSlug}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
