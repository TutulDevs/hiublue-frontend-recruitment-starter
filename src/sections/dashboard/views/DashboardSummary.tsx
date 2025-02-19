"use client";

import { getDashboardSummary } from "@/lib/api";
import { DashboardSummaryType } from "@/lib/globalTypes";
import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";

export default function DashboardSummary() {
  const filters = ["this-week", "prev-week"];
  const [filter, setFilter] = useState(filters[0]);
  const [summary, setSummary] = useState<DashboardSummaryType | null>(null);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getDashboardSummary(filter).then((data) => setSummary(data));
  }, [filter]);

  const summaryList = [
    {
      title: "Total active users",
      valueCurrent: summary?.current.active_users ?? 0,
      valuePrev: summary?.previous.active_users ?? 0,
    },
    {
      title: "Total Clicks",
      valueCurrent: summary?.current.clicks ?? 0,
      valuePrev: summary?.previous.clicks ?? 0,
    },
    {
      title: "Total Appearances",
      valueCurrent: summary?.current.appearance ?? 0,
      valuePrev: summary?.previous.appearance ?? 0,
    },
  ];

  return (
    <>
      {/* header & filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "36px",
            color: "#1C252E",
          }}
        >
          Dashboard
        </Typography>

        <FormControl size="small">
          <Select
            id="filter-select-small"
            value={filter}
            onChange={handleFilterChange}
          >
            {filters.map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* cards */}
      <Grid container spacing={3}>
        {summaryList.map((data) => {
          const cur = data.valueCurrent;
          const prev = data.valuePrev;

          const diff = prev === 0 ? 0 : ((cur - prev) / prev) * 100;
          const percentChange = diff === 0 ? 0 : diff.toFixed(1);

          return (
            <Grid key={data.title} item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {data.title}
                </Typography>

                <Typography variant="h3" sx={{ mb: 1 }}>
                  {cur >= 1000
                    ? `${
                        (cur / 1000).toFixed(2).slice(0, -3) ===
                        (cur / 1000).toFixed(0)
                          ? (cur / 1000).toFixed(0)
                          : (cur / 1000).toFixed(2)
                      }k`
                    : cur}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexFlow: "row wrap",
                    gap: 0.5,
                  }}
                >
                  <Image
                    src={diff < 0 ? "/arrow-neg.png" : "/arrow-pos.png"}
                    alt=""
                    width={24}
                    height={24}
                  />

                  <Typography variant="subtitle2" sx={{}}>
                    {Math.abs(Number(percentChange)) + "%"}
                  </Typography>

                  <Typography variant="body2" sx={{}}>
                    previous month
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
