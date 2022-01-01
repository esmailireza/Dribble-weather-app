const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM"],
    datasets: [
      {
        label: "Temperature",
        data: [0, 10, -10, 20, -20],
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderColor: "#7285ff",
        backgroundColor: "#7285ff38",
        responsive: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
      maintainAspectRatio: false,
    },
    plugins: {
      title: {
        display: true,
        text: " Temperature . Precipitation . Wind",
        align: "start",
      },
    },
  },
});
