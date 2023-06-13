import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <MuiLink
      component={NextLink}
      href={href}
      underline="none"
      color="inherit"
      sx={{ width: "100%" }}
    >
      {children}
    </MuiLink>
  );
}
