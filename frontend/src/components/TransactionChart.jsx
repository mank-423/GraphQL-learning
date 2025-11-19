import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GET_CHART_DATA } from "@/graphql/queries/transaction.queries";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({transactions}) => {
  const { loading, data: compute, error, refetch } = useQuery(GET_CHART_DATA);

  const chartData =
    compute?.categoryStatistics || { credit: 0, debit: 0 };

  const data = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        data: [chartData.credit, chartData.debit],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        spacing: 5,        // space between segments
        borderRadius: 20,  // rounded ends
        cutout: "70%",     // thinner ring
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
    },
    maintainAspectRatio: false,
  };


  useEffect(()=>{
    refetch()
  }, [transactions])

  return (
    <div className="p-4 shadow rounded-xl bg-[#1a1a1a]">
      <h3 className="text-lg font-bold text-white text-center mb-3">
        Transaction Summary
      </h3>

      <div className="h-64 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
