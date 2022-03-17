import { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import Head from "next/head";

const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  // console.log("THEME => ", theme);

  return (
    <>
      <Head>
        <link rel="stylesheet" href={`/css/${theme}.css`} />
      </Head>

      {theme === "dark" ? (
        <span
          style={{ fontSize: "24px" }}
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
        >
          🌞
        </span>
      ) : (
        <span
          style={{ fontSize: "24px" }}
          onClick={() => {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }}
        >
          🌓
        </span>
      )}
    </>
  );
};

export default ToggleTheme;
