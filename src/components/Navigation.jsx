// Navigation.js

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  const [profile_id, setProfileId] = useState(-1);

  const updateProfileId = (newProfileId) => {
    setProfileId(newProfileId);
  };
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="nav-container">
          <NavLink className="navbar-brand" to="/">
            LearnSphere
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                {}
                <span
                  className="nav-link"
                  onClick={() => updateProfileId(1)}
                >
                  *Simulate Login*
                </span>
              </li>

              <li className="nav-item">
                  {profile_id !== -1 ? (
                    <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                    </NavLink>
                  ) : (
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  )}
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/lectures/">
                  Lectures
                </NavLink>
              </li>
              
              <li className="nav-item">
                {profile_id !== -1 ? (
                  <NavLink className="nav-link" to={`/profile/${profile_id}`}>
                    Profile
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login/">
                    Login
                  </NavLink>
                )}
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
