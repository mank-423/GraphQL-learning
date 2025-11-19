import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_TRANSACTION } from "@/graphql/queries/transaction.queries";
import { UPDATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";

const Transaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);

  const { loading, data } = useQuery(GET_TRANSACTION, {
    onError: (err) => {
      setErrorMsg(err.message)
    },
    variables: {
      transactionId: id,
    }
  });

  const [updateTransaction, { loading: saving }] = useMutation(UPDATE_TRANSACTION, {
    onError: (err) => {
      setErrorMsg(err.message);
    }
  });

  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "",
  });



  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    try {

      const res = await updateTransaction({
        variables: {
          input: {
            transactionId: id,
            amount: parseFloat(form.amount),
            description: form.description,
            type: form.type,
          },
        }
      })

      if (!res.data) {
        throw new Error("No response returned");
      }

      toast.success("Transaction updated!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error updating transaction");
      setErrorMsg(error.message);
    }
  };

  const handleChange = (key, val) => {
    setForm({
      ...form,
      [key]: val,
    });
  }

  useEffect(() => {
    if (data?.transaction) {
      setForm(data?.transaction);
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <FormSkeleton />
      ) : (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-8 shadow-lg rounded-xl w-96 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">Update Transaction</h2>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="border p-2 rounded"
            required
          />

          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="type"
                value="credit"
                checked={form.type === "credit"}
                onChange={(e) => handleChange('type', e.target.value)}
              />
              <span className="ml-1">Credit</span>
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="debit"
                checked={form.type === "debit"}
                onChange={(e) => handleChange('type', e.target.value)}
              />
              <span className="ml-1">Debit</span>
            </label>
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Transaction;
