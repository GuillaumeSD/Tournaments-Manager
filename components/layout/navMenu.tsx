import { Icon } from "@iconify/react";
import {
  Box,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const MenuOptions = [
  { text: "Joueurs", icon: "mdi:account-group", href: "/players" },
  { text: "Matchs", icon: "mdi:tournament", href: "/matches" },
  { text: "Classement", icon: "mdi:podium", href: "/ranking" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NavMenu({ open, onClose }: Props) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar />
      <Box sx={{ width: 250 }}>
        <List>
          {MenuOptions.map(({ text, icon, href }) => (
            <ListItem key={text} disablePadding>
              <Link
                href={href}
                underline="none"
                color="inherit"
                sx={{ width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon={icon} height="1.5em" />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
