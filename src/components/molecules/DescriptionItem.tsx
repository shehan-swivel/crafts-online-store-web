import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type DescriptionItemProps = {
  label: string;
  value: any;
};

const DescriptionItem = ({ label, value }: DescriptionItemProps) => {
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <Typography gutterBottom pr={2} color="text.secondary" variant="body2">
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="body2">
          {value ? value : "-"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DescriptionItem;
