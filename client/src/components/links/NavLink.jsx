// import { Margin } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NavLink({ sx, href, variant,component, tag }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 1 }}>
      <Typography component={component} variant={variant} noWrap>
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate(href);
          }}
          href={href}
          sx={sx}
        >
          {tag}
        </Link>
      </Typography>
    </Box>
  );
}

export default NavLink;
