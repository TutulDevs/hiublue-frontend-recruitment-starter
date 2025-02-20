import CreateOfferForm from "@/sections/onboarding/views/CreateOfferForm";
import { Box, Card, Container, Divider, Typography } from "@mui/material";

export const metadata = {
  title: "Onboarding",
};

export default function OnboardingPage() {
  return (
    <>
      <Container maxWidth="md" disableGutters>
        <Card sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
          {/* info */}
          <Box sx={{ py: 3, px: { xs: 2, md: 3 } }}>
            <Typography variant="h6">Create Offer</Typography>

            <Typography variant="body2">
              Send onboarding offer to new user
            </Typography>
          </Box>

          <Divider />

          {/* form */}
          <CreateOfferForm />
        </Card>
      </Container>
    </>
  );
}
