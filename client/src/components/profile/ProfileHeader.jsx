import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import SocialLink from "./SocialLink";

const ProfileHeader = ({ profile }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="display-4 text-center">{profile.user.name}</h1>
          <p className="lead text-center">
            {profile.status}{" "}
            {!isEmpty(profile.company) && <span>at {profile.company}</span>}
          </p>
          {!isEmpty(profile.location) && <p>at {profile.location}</p>}
          <p>
            {!isEmpty(profile.website) && (
              <SocialLink name="website" url={profile.website} />
            )}
            {!isEmpty(profile.social && profile.social.twitter) && (
              <SocialLink name="twitter" url={profile.social.twitter} />
            )}
            {!isEmpty(profile.social && profile.social.facebook) && (
              <SocialLink name="facebook" url={profile.social.facebook} />
            )}
            {!isEmpty(profile.social && profile.social.linkedin) && (
              <SocialLink name="linkedin" url={profile.social.linkedin} />
            )}
            {!isEmpty(profile.social && profile.social.instagram) && (
              <SocialLink name="instagram" url={profile.social.instagram} />
            )}
            {!isEmpty(profile.social && profile.social.youtube) && (
              <SocialLink name="youtube" url={profile.social.youtube} />
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
