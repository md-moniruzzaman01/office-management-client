import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { hoverEffect } from "../common/widgets/Navbar/config/constants";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    if (theme === "system") {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, setTheme]);

  const isDark = theme === "dark";
  const isLight = theme === "light";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`${hoverEffect}`}>
          <Moon
            className={`absolute  !w-5 !h-5 transition-all ${
              isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
          <Sun
            className={`transition-all  !w-5 !h-5 ${
              isLight ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system"); // Set the theme to system preference
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
