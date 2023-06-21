import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

type AppDialogProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
};

const AppDialog = ({ open, title, subtitle, children, onClose }: AppDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
