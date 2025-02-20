"use client";

import { useState } from "react";
import DashboardTopbar from "./DashboardTopbar";
import DashboardSummary from "./DashboardSummary";
import DashboardStats from "./DashboardStats";

export default function DashboardView() {
  const filters = ["this-week", "prev-week"];
  const [filter, setFilter] = useState(filters[0]);

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
