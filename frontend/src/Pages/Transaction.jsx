import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Transaction = () => {
  const token = Cookies.get("sb_token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      const query = `
        query($transactionId: ID!) {
          transaction(transactionId: $transactionId) {
            id
            amount
            description
            type
          }
        }
      `;

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { transactionId: id },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      setForm({
        amount: json.data.transaction.amount,
        description: json.data.transaction.description,
        type: json.data.transaction.type,
      });
    } catch (error) {
      setErrorMsg(error.message || "Error loading transaction");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Update transaction
  // ===============================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const mutation = `
        mutation($input: UpdateTransactionInput!) {
          updateTransaction(input: $input) {
            id
            amount
            description
            type
          }
        }
      `;

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              transactionId: id,
              amount: parseFloat(form.amount),
              description: form.description,
              type: form.type,
            },
          },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      console.log("Updated:", json.data.updateTransaction);

      alert("Transaction updated!");
      navigate("/"); // redirect back to home
    } catch (error) {
      setErrorMsg(error.message || "Error updating transaction");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

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

          {/* TYPE FIELD */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="type"
                value="credit"
                checked={form.type === "credit"}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <span className="ml-1">Credit</span>
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="debit"
                checked={form.type === "debit"}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
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
