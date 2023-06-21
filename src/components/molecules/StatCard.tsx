import HistoryIcon from "@mui/icons-material/History";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ElementType, useEffect, useState } from "react";

type StatCardProps = {
  label: string;
  value: number | string;
  icon: ElementType;
  color: string;
  subtitle?: string;
};

const StatCard = ({ label, value, icon, color, subtitle }: StatCardProps) => {
  const [lastUpdateOn, setLastUpdateOn] = useState("");

  useEffect(() => {
    setLastUpdateOn(format(new Date(), "yyyy-MM-dd, HH:mm:ss a"));
  }, []);

  return (
    <Paper sx={{ p: 3 }} className="shadow">
      <Typography variant="overline" fontWeight="bold">
        {label}
      </Typography>

      <Box display="flex" alignItems="center" mt={1} mb={2}>
        <Avatar
          className="shadow"
          sx={{ background: color, width: 64, height: 64, mr: 2 }}
          variant="rounded"
          aria-label="statistic icon"
        >
          <Icon fontSize="large" component={icon} />
        </Avatar>
        <div>
          <Typography variant="subtitle2" color="textSecondary">
            {subtitle}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value?.toLocaleString()}
          </Typography>
        </div>
      </Box>

      <Box display="flex" alignItems="center">
        <HistoryIcon color="action" fontSize="small" />
        <Typography variant="caption" color="textSecondary" pl={1}>
          {lastUpdateOn}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
