import React from "react";
import spinner from "../../img/spinner.gif";

const styles = {
  width: "200px",
  margin: "auto",
  display: "block"
};

const Spinner = () => <img src={spinner} alt="Loading" style={styles} />;

export default Spinner;
