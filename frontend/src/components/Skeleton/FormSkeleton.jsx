import React from "react";
import Skeleton from "react-loading-skeleton";

export default function FormSkeleton() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        <Skeleton width={180} height={28} />
      </h2>

      {/* Amount */}
      <div className="mb-4">
        <Skeleton height={20} width={80} />
        <Skeleton height={38} className="mt-2" />
      </div>

      {/* Description */}
      <div className="mb-4">
        <Skeleton height={20} width={120} />
        <Skeleton height={38} className="mt-2" />
      </div>

      {/* Type */}
      <div className="mb-4">
        <Skeleton height={20} width={100} />
        <div className="flex gap-4 mt-2">
          <Skeleton height={22} width={80} />
          <Skeleton height={22} width={80} />
        </div>
      </div>

      {/* Button */}
      <Skeleton height={42} />
    </div>
  );
}
