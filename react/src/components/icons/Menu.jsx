import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Menu = ({ className }) => {
  return <FontAwesomeIcon icon={faBars} className={className} />;
};
