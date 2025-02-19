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

      <AppBar position="static" color="primary">
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
                color: "inherit",
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
                    color: "inherit",
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
                  color: "inherit",
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
                  color: "inherit",
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
