"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Button, CssBaseline } from "@mui/material";

function NavbarPublic() {
  const { user, logoutHandler } = useAuth();

  return (
    <>
      <CssBaseline enableColorScheme />

      <AppBar
        position="static"
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Typography
              noWrap
              component={Link}
              href="/"
              sx={{
                color: "primary",
                textDecoration: "none",
              }}
            >
              <Image src="/hiu.png" alt="logo" width={40} height={36} />
            </Typography>

            {user && (
              <>
                <Typography
                  noWrap
                  component={Link}
                  href="/dashboard"
                  sx={{
                    color: "primary",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Typography>
              </>
            )}

            {!user ? (
              <Typography
                noWrap
                component={Link}
                href="/login"
                sx={{
                  color: "primary",
                  textDecoration: "none",
                  ml: "auto",
                }}
              >
                Login
              </Typography>
            ) : (
              <Button
                variant="text"
                sx={{
                  color: "primary",
                  textDecoration: "none",
                  ml: "auto",
                }}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavbarPublic;
