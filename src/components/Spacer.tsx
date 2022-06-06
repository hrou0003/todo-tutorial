import React from "react";

type Props = {
  height: number;
};

const Spacer: React.FC<Props> = ({ height, }) => {
  return <div style={{ height, }} />;
};

export default Spacer;
