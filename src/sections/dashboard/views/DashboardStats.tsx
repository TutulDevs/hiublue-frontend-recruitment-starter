import DashboardOfferSentChart from "@/components/charts/DashboardOfferSentChart";
import DashboardWebsiteVisitsChart from "@/components/charts/DashboardWebsiteVisitsChart";
import { getDashboardStats } from "@/lib/api";
import { DashboardStatsType } from "@/lib/globalTypes";
import { Card, Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardStats: React.FC<{ filter: string }> = ({ filter }) => {
  const [stat, setStat] = useState<DashboardStatsType | null>(null);

  useEffect(() => {
    getDashboardStats(filter).then((data) => setStat(data));
  }, [filter]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, minHeight: 300 }}>
            <Typography variant="subtitle2">Website visits</Typography>
            {!stat?.website_visits ? (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <DashboardWebsiteVisitsChart data={stat.website_visits} />
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, minHeight: 300 }}>
            <Typography variant="subtitle2">Offers sent</Typography>
            {!stat?.offers_sent ? (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <DashboardOfferSentChart data={stat.offers_sent} />
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardStats;
