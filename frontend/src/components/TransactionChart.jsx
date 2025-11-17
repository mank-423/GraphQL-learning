import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const credit = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const debit = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        data: [credit, debit],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-4 shadow rounded-xl">
      <h3 className="text-lg font-bold text-center mb-3">Transaction Summary</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default TransactionChart;
