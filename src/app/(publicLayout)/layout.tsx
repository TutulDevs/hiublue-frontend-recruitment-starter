import NavbarPublic from "@/components/navbar/NavbarPublic";
import { Container } from "@mui/material";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarPublic />

      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default PublicLayout;
