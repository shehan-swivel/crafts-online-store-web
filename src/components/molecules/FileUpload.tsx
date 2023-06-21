import Box, { BoxProps } from "@mui/material/Box";
import MuiButtonBase, { ButtonBaseProps as MuiButtonBaseProps } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { ChangeEvent, ReactNode } from "react";

type FileUploadProps = {
  icon?: ReactNode;
  label: string;
  accept?: string;
  multiple?: boolean;
  imageUrl?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type ButtonBaseProps = MuiButtonBaseProps & {
  component: string;
};

const ButtonBase = styled(MuiButtonBase)<ButtonBaseProps>(({ theme }) => ({
  display: "flex",
  border: "1px dashed",
  borderColor: theme.palette.grey[400],
  borderRadius: theme.shape.borderRadius,
}));

const UploadButtonContent = styled(Box)<BoxProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 100,
});

const FileUpload = ({ icon, label, accept, multiple, imageUrl, onChange }: FileUploadProps) => {
  return (
    <label htmlFor="file-upload">
      <input
        style={{ display: "none" }}
        id="file-upload"
        name="file-upload"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />

      <ButtonBase component="span">
        {imageUrl ? (
          <Image src={imageUrl} alt="image" height={100} width={200} style={{ objectFit: "contain" }} />
        ) : (
          <UploadButtonContent>
            <span>{icon}</span>
            <span>{label}</span>
          </UploadButtonContent>
        )}
      </ButtonBase>
    </label>
  );
};

export default FileUpload;
