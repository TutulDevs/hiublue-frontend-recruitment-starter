import { DashboardStatsType } from "@/lib/globalTypes";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardOfferSentChart: React.FC<{
  data: DashboardStatsType["offers_sent"];
}> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#1C252E"],
    xaxis: {
      categories: Object.keys(data).map(
        (day) => day[0].toUpperCase() + day.slice(1, 3),
      ),
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    grid: { borderColor: "#f1f1f1" },
    tooltip: { enabled: true },
  };

  const series = [
    {
      name: "Offers sent",
      data: Object.values(data),
    },
  ];

  return (
    <ApexChart
      options={chartOptions}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default DashboardOfferSentChart;
