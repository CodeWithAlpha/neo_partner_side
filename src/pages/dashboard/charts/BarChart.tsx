import Chart from "react-apexcharts";

export default function BarChart({ data }: { data: any }) {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "#fff", // white card background
    },
    title: {
      text: "API Usage by Service",
      align: "left",
      margin: 10,
      offsetX: 10,
      style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#111827",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 20,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map((item: any) => item.name),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    colors: ["#22c55e"], // green bar color
    grid: {
      borderColor: "#fff",
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Usage",
      data: data.map((item: any) => item.value),
    },
  ];

  return (
    <Chart options={options as any} series={series} type="bar" height={300} />
  );
}
