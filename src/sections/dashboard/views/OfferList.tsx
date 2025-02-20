"use client";

import { getOffersList } from "@/lib/api";
import { OfferTypes, PaginatedResponse } from "@/lib/globalTypes";
import {
  Box,
  Card,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@/theme/palette";

const types = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Yearly",
    value: OfferTypes.YEARLY,
  },
  {
    label: "Monthly",
    value: OfferTypes.MONTHLY,
  },
  {
    label: "Pay as you go",
    value: OfferTypes.PAY_AS_YOU_GO,
  },
];

const OfferList = () => {
  const [page, setPage] = useState(0);
  const [per_page, setPer_page] = useState(5);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(types[0].value);
  const [status, setStatus] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setStatus(newValue == 1 ? "accepted" : "");
  };

  const [offers, setOffers] = useState<PaginatedResponse | null>(null);

  useEffect(() => {
    getOffersList({
      page,
      per_page,
      search,
      type: type == "all" ? "" : type,
      status,
    }).then((data) => setOffers(data));
  }, [page, per_page, search, type, status]);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2.5 }}>
          Offer List
        </Typography>

        {/* tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2.5 }}>
          <Tabs
            value={!status ? 0 : 1}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .Mui-selected": {
                color: "text.primary",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "text.primary",
              },
              "& .MuiTab-root": {
                minWidth: 48,
              },
            }}
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Accepted" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* search & type */}
        <Box sx={{ mb: 2.5, display: "flex", gap: 2, flexFlow: "row wrap" }}>
          <FormControl sx={{ width: { xs: "100%", md: 505 } }}>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", md: 200 } }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              {types.map((x) => (
                <MenuItem key={x.label} value={x.value}>
                  {x.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* table */}
        <TableContainer component={Paper}>
          <Table
            sx={{
              whiteSpace: "nowrap",
              // minWidth: 450,
              // "& .MuiTableCell-root": {
              //   whiteSpace: "nowrap",
              //   px: { xs: 1, sm: 2 },
              //   py: { xs: 1, sm: 1.5 },
              // },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers?.data?.map((offer) => (
                <TableRow
                  key={offer.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {offer.user_name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "text.disabled" }}>
                      {offer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {offer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {offer.company}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {offer.jobTitle}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {offer.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={offer.status}
                      color={
                        offer.status == "accepted"
                          ? "success"
                          : offer.status == "rejected"
                            ? "error"
                            : "warning"
                      }
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton aria-label="edit" sx={{ color: grey["600"] }}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="options"
                      sx={{ color: grey["600"] }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* table pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {offers?.meta && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={offers?.meta.total}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={per_page}
              onRowsPerPageChange={(e) => setPer_page(Number(e.target.value))}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

export default OfferList;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
