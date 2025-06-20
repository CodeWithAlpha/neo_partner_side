import Chart from "react-apexcharts";

export default function LineChart({ data }: { data: number[] }) {
  const lineChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "#fff",
    },
    title: {
      text: "API Calls Over Time",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 4 },
    colors: ["#22c55e"], // green-500
    grid: {
      borderColor: "#e5e7eb", // Tailwind gray-200
      strokeDashArray: 0,
    },
  };

  const lineChartSeries = [
    {
      name: "API Calls",
      data,
    },
  ];

  return (
    <Chart
      options={lineChartOptions as any}
      series={lineChartSeries}
      type="line"
      height={250}
    />
  );
}
