import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

const DashboardTopbar: React.FC<{
  filters: { value: string; label: string }[];
  filter: string;
  onChange: (v: string) => void;
}> = ({ filters, filter, onChange }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexFlow: "row wrap",
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
            onChange={(e) => onChange(e.target.value)}
          >
            {filters.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default DashboardTopbar;
