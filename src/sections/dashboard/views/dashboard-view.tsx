"use client";

import { useState } from "react";
import DashboardTopbar from "./DashboardTopbar";
import DashboardSummary from "./DashboardSummary";
import DashboardStats from "./DashboardStats";

export default function DashboardView() {
  const filters = [
    { value: "this-week", label: "This Week" },
    { value: "prev-week", label: "Previous Week" },
  ];
  const [filter, setFilter] = useState(filters[0].value);

  const handleFilterChange = (v: string) => setFilter(v);

  return (
    <>
      {/* topbar */}
      <DashboardTopbar
        filters={filters}
        filter={filter}
        onChange={handleFilterChange}
      />

      {/* summary */}
      <DashboardSummary filter={filter} />

      {/* stats / charts */}
      <DashboardStats filter={filter} />
    </>
  );
}
