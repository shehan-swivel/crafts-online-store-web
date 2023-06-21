import React from "react";
import Typography from "@mui/material/Typography";

type TitleProps = {
  title: string;
  subtitle?: string;
};

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      {subtitle && (
        <Typography variant="subtitle2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default Title;
