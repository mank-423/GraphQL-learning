import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TransactionCard = ({ tx }) => {
  const navigate = useNavigate();
  const isCredit = tx.type === "credit";

  return (
    <div
      className={`w-[48%] p-4 rounded-xl shadow-md border-l-8 ${
        isCredit ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
      }`}
    >
      {/* TITLE + Edit Btn */}
      <div className="flex justify-between items-center">
        <p className="font-semibold">{tx.description}</p>

        <button
          className="text-gray-600 hover:text-black"
          onClick={() => navigate(`/transaction/${tx.id}`)}
        >
          <FaEdit />
        </button>
      </div>

      <p className="text-xl font-bold mt-1">₹{tx.amount}</p>
      <p className="text-sm uppercase text-gray-600">{tx.type}</p>
    </div>
  );
};

export default TransactionCard;
