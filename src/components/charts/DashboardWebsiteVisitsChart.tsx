import { DashboardStatsType } from "@/lib/globalTypes";
import { success, warning } from "@/theme/palette";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardWebsiteVisitsChart: React.FC<{
  data: DashboardStatsType["website_visits"];
}> = ({ data }) => {
  const chartDataForVisits: {
    series: ApexAxisChartSeries;
    options: ApexOptions;
  } = {
    series: [
      {
        name: "Desktop",
        data: Object.values(data).map((day) => day.desktop),
        color: success["dark"],
      },
      {
        name: "Mobile",
        data: Object.values(data).map((day) => day.mobile),
        color: warning["main"],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadius: 3,
        },
      },
      xaxis: {
        categories: Object.keys(data).map(
          (day) => day[0].toUpperCase() + day.slice(1, 3)
        ),
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: undefined },
        labels: { style: { colors: "#637381" } },
      },
      grid: {
        borderColor: "#F4F6F8",
        strokeDashArray: 4,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        markers: { shape: "circle" },
      },
      dataLabels: { enabled: false },
      title: { text: undefined },
    },
  };

  return (
    <>
      <ApexChart
        type="bar"
        height={350}
        series={chartDataForVisits.series}
        options={chartDataForVisits.options}
      />
    </>
  );
};

export default DashboardWebsiteVisitsChart;
