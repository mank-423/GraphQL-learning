import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MdOutlineLogout } from "react-icons/md";
import toast from "react-hot-toast";
import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import TransactionCard from "@/components/Card/TransactionCard";
import TransactionChart from "@/components/TransactionChart";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.queries";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.queries";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { client } from "@/main";

const Home = () => {
  const token = Cookies.get("sb_token");

  const {
    loading,
    data: userResponse,
    error: userError
  } = useQuery(GET_AUTHENTICATED_USER);

  const {
    loading: loadingTransactions,
    data: transactionData,
    error: transactionError,
    refetch: refetchTransactions,
  } = useQuery(GET_TRANSACTIONS);

  const [
    createTransaction,
    {
      loading: saving,
      error: errorMsg,
    }] = useMutation(CREATE_TRANSACTION, {
      onError: (err) => {
        toast.error(err.message);
      }
    });

  const transactions = transactionData?.transactions || [];

  const userData = userResponse?.authUser || null;

  const [profileLoading, setProfileLoading] = useState(true);

  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "debit",
  });

  // Load profile after GraphQL query finishes
  useEffect(() => {
    if (!loading) {
      setProfileLoading(false);
    }
  }, [loading]);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.amount || isNaN(parseFloat(form.amount))) {
      return toast.error("Amount must be a valid number");
    }

    try {
      const res = await createTransaction({
        variables: {
          input: {
            amount: parseFloat(form.amount),
            description: form.description,
            type: form.type,
          },
        },
      });

      if (!res.data?.createTransaction) return;

      toast.success("Transaction created!");

      // Only reset if mutation succeeded
      setForm({ amount: "", description: "", type: "" });

      refetchTransactions();

    } catch (err) {
      toast.error(err.message);
    }

  };

  const logout = () => {
    Cookies.remove("sb_token");
    client.clearStore(); // Clearing the cached data
    window.location.href = "/login";
  };

  if (userError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load user: {userError.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">

      {/* Profile */}
      <div className="mb-6 flex flex-row items-center gap-4">
        {profileLoading ? (
          <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <>
            <img
              src={userData?.profilepic}
              className="w-24 h-24 rounded-full object-cover shadow"
              alt="User"
            />
            <h2 className="text-xl font-semibold">{userData?.username}</h2>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <MdOutlineLogout className="text-2xl" />
        </button>
      </div>

      {/* Main Grid: Chart Left + Form Right */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left: Chart */}
        <div className="w-full">
          {!loadingTransactions && <TransactionChart transactions={transactions} />}
        </div>

        {/* Right: Form */}
        <div className="w-full">
          {loading ? (
            <FormSkeleton />
          ) : (
            <form
              onSubmit={handleCreate}
              className="p-8 shadow-lg rounded-xl flex flex-col gap-4"
            >
              <h2 className="text-2xl text-white font-bold text-center">Create Transaction</h2>

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <div className="flex gap-4 text-white">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="credit"
                    checked={form.type === "credit"}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  />
                  Credit
                </label>

                <label>
                  <input
                    type="radio"
                    name="type"
                    value="debit"
                    checked={form.type === "debit"}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  />
                  Debit
                </label>
              </div>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Transaction"}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Cards Section */}
      <div className="mt-10 w-full max-w-3xl flex flex-wrap gap-4 justify-center">
        {!loadingTransactions ? transactions.length === 0 ? (
          <p className="text-gray-500 w-full text-center">No transactions yet.</p>
        ) : (
          transactions.map((tx) => <TransactionCard key={tx.id} tx={tx} />)
        ) : (
          <p className="text-gray-500 w-full text-center">Loading transactions...</p>
        )
        }
      </div>

    </div>
  );
};

export default Home;
