import DashboardView from "@/sections/dashboard/views/dashboard-view";
import OfferList from "@/sections/dashboard/views/OfferList";
import { Box } from "@mui/material";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
        <DashboardView />

        <OfferList />
      </Box>
    </>
  );
}
