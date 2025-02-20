import { Box, Typography, Container } from "@mui/material";

export const metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.75rem" },
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Welcome to Our Platform
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Discover amazing features and solutions that will help you achieve
            your goals. We provide the tools you need to succeed.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
