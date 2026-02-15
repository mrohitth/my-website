import React from "react";
import logo from "@/assets/controlm.png"; // put your PNG in the same folder or assets

interface ControlMLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
}

const ControlMLogo: React.FC<ControlMLogoProps> = ({
  width = "22px",
  height = "24px",
  ...props
}) => (
  <img
    src={logo}
    alt="Control-M Logo"
    width={width}
    height={height}
    {...props}
  />
);

export default ControlMLogo;
