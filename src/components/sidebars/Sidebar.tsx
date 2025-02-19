import { grey } from "@/theme/palette";
import { Box, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const links = [
  { iconSrc: "/dash.png", label: "Dashboard", href: "/dashboard" },
  { iconSrc: "/onboarding.png", label: "Onboarding", href: "/onboarding" },
];

const Sidebar: React.FC<{}> = ({}) => {
  return (
    <>
      <Toolbar sx={{ minHeight: "72px !important" }}>
        <Link href="/">
          <Image src="/hiu.png" alt="" width={48} height={48} />
        </Link>
      </Toolbar>

      <Box sx={{ px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            pt: 2,
            pb: 1,
            pl: 1.5,
            mb: 0.5,
            fontWeight: 700,
            fontSize: "11px !important",
            lineHeight: "18px",
            color: grey["500"],
          }}
        >
          Overview
        </Typography>

        {links.map((link) => (
          <Typography
            key={link.href}
            component={Link}
            href={link.href}
            sx={{
              mb: 0.5,
              py: "11px",
              pr: 1,
              pl: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "14px !important",
              lineHeight: "22px",
              color: grey["600"],
              transition: "all 0.3s ease",
              "&:hover": {
                color: grey["800"],
              },
            }}
          >
            <Image src={link.iconSrc} alt={link.label} width={24} height={24} />
            <span>{link.label}</span>
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
