import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Close = ({ className }) => {
  return <FontAwesomeIcon icon={faXmark} className={className} />;
};
