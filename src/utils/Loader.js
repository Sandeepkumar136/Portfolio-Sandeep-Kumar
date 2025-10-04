import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <ClipLoader color="#ff0000ff" size={50} />
  </div>
);

export default Loader;
