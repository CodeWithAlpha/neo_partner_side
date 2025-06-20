import Chart from "react-apexcharts";

export default function PeiChart({ data }: { data: number[] }) {
  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: { show: false },
    },
    labels: ["Commissions", "Charges"],
    legend: {
      position: "left",
      horizontalAlign: "center",
      fontSize: "16px",
      markers: {
        radius: 12,
      },
    },
    colors: ["#22c55e", "#808080"], // green-500, gray-800
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Charges vs. Commissions",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
  };

  return (
    <Chart
      options={pieChartOptions as any}
      series={data}
      type="pie"
      height={250}
    />
  );
}
