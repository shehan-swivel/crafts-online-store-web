import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { hideSnackbar } from "@/store/slices/ui-slice";
import Alert from "@mui/material/Alert";
import MSnackbar from "@mui/material/Snackbar";

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { show, message, severity } = useAppSelector((state) => state.ui.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <MSnackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      ClickAwayListenerProps={{ onClickAway: () => null }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert severity={severity} elevation={10} variant="filled">
        {message}
      </Alert>
    </MSnackbar>
  );
};

export default Snackbar;
