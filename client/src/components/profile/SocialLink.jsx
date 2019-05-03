import React from "react";
import PropTypes from "prop-types";

const SocialLink = ({ name, url }) => {
  const icon = name => {
    switch (name) {
      case "twitter":
        return <i className="fab fa-twitter fa-2x" />;
      case "facebook":
        return <i className="fab fa-facebook fa-2x" />;
      case "linkedin":
        return <i className="fab fa-linkedin fa-2x" />;
      case "instagram":
        return <i className="fab fa-instagram fa-2x" />;
      case "youtube":
        return <i className="fab fa-youtube fa-2x" />;
      case "website":
      default:
        return <i className="fas fa-globe fa-2x" />;
    }
  };
  return (
    <a
      className="text-white p-2"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon(name)}
    </a>
  );
};

SocialLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SocialLink;
