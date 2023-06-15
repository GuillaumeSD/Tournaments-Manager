import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import NavBar from "./navBar";
import { useLocalStorage } from "../../helpers/localStorage";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [useDarkMode, setDarkMode] = useLocalStorage("useDarkMode", false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: useDarkMode ? "dark" : "light",
        },
      }),
    [useDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar
        darkMode={useDarkMode}
        switchDarkMode={() => setDarkMode((val) => !val)}
      />
      <main style={{ margin: "2em 2vw" }}>{children}</main>
    </ThemeProvider>
  );
}
