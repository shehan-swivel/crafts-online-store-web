import Image from "next/image";
import React from "react";

type LogoProps = {
  height: number;
  width: number;
};

const Logo = ({ height, width }: LogoProps) => {
  return <Image src="/logo.png" alt="logo" height={height} width={width} style={{ objectFit: "cover" }} />;
};

export default Logo;
