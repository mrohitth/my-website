import React from "react";
import logo from "@/assets/sql.png"; // put your PNG in the same folder or assets

interface SQLLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
}

const SQLLogo: React.FC<SQLLogoProps> = ({
  width = "20px",
  height = "22px",
  ...props
}) => (
  <img
    src={logo}
    alt="SQL Logo"
    width={width}
    height={height}
    {...props}
  />
);

export default SQLLogo;
