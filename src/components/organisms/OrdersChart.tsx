import { OrderChartItem } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type OrdersChartProps = {
  title: string;
  data: OrderChartItem[];
};

const OrdersChart = ({ title, data }: OrdersChartProps) => {
  const theme = useTheme();

  return (
    <Card className="shadow" sx={{ height: "360px" }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      </CardContent>
      <Divider />

      <ResponsiveContainer width="100%" height="100%" maxHeight={280}>
        <BarChart
          width={150}
          height={20}
          data={data}
          margin={{
            top: 20,
            right: 12,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="6" vertical={false} />
          <Bar dataKey="count" fill={theme.palette.info.main} barSize={24} radius={[8, 8, 0, 0]} />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default OrdersChart;
