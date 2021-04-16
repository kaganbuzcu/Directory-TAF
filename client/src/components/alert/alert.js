import React from "react";
import "./alert.scss";
import {
  CAlert
} from "@coreui/react";

/**
 * @callThis <Alert
        content="lorem"
        color="danger"
        show={true}
        onShowChange={onShowChange}
         />
 * @param {*} props { content, color, show, onShowChange }
 * @returns CAlert Component
 */

const Alert = (props) => {
  const { content, color, show, onShowChange } = props;
  return (
    <CAlert
      color={color}
      show={show}
      fade={true}
      onShowChange={onShowChange}
      className="custom-alert"
      closeButton
    >
      {content}
    </CAlert>
  )
}

export default Alert;
