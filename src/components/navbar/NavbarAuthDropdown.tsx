"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { error, success } from "@/theme/palette";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const NavbarAuthDropdown = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();
  const { user, logoutHandler } = useAuth();

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0.75, my: 2, border: `1px solid ${success["light"]}` }}
        >
          <Avatar alt="user" src="/avatar.png" sx={{ width: 40, height: 40 }} />
        </IconButton>

        <Menu
          sx={{ mt: "55px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Typography component={"h6"} sx={{ p: 1, px: 1, fontSize: 14 }}>
            Hi, {user?.name}
          </Typography>

          <MenuItem
            sx={{
              bgcolor: error["light"],
              "&:hover": { bgcolor: error["main"] },
            }}
            onClick={() => {
              handleCloseUserMenu();
              logoutHandler();
              router.push("/login");
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{"Logout"}</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default NavbarAuthDropdown;
