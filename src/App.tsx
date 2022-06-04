import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { api } from "./api";
import { UIContext } from "./context";

const bgImg = require("./images/bg.jpg");

const App = () => {
  const [query, setQuery] = React.useState("");
  const [weather, setWeather] = React.useState<{
    location?: { country: string; name: string };
    current?: { temp_c: number; condition: { icon: string; text: string } };
  }>({});

  const screenUp616pxWidth = useMediaQuery("(min-width:616px)");
  const screenUp700pxHeight = useMediaQuery("(min-height:700px)");

  const timer = React.useRef<NodeJS.Timer>();
  const { setAlert } = React.useContext(UIContext);

  const handleWeatherRequest = React.useCallback(async () => {
    try {
      if (query) {
        const queriedWeather = await api.fetchWeather(query);

        if (queriedWeather.error) throw new Error(queriedWeather.error.message);

        setWeather(queriedWeather);
      }
    } catch (e) {
      if (e instanceof Error)
        setAlert({ show: true, severity: "error", message: e.message });
    }
  }, [query, setAlert]);

  React.useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(handleWeatherRequest, 1000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, handleWeatherRequest]);

  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: 400, width: "100%", m: 2, position: "relative" }}>
        <Box
          sx={{
            bgcolor: "rgba(250, 250, 250, 0.4)",
            borderRadius: 1,
          }}
        >
          <TextField
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                if (timer.current) clearTimeout(timer.current);
                await handleWeatherRequest();
              }
            }}
            value={query}
            variant="filled"
            label="Search ..."
          />
        </Box>
        {weather.location && weather.current && (
          <Card
            elevation={15}
            sx={{
              mt: 2,
              bgcolor: "rgba(250, 250, 250, 0.8)",
              ...(screenUp700pxHeight && {
                width: screenUp616pxWidth ? 500 : "100%",
                position: "absolute",
                bottom: (theme) => theme.spacing(-2),
                left: "50%",
                transform: "translate(-50%, 100%)",
              }),
            }}
          >
            <Grow in>
              <CardContent>
                <Typography align="center" variant="h4">
                  {weather.location.name}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  ( {weather.location.country} )
                </Typography>
                <Typography align="center" variant="h2">
                  {weather.current.temp_c}
                  <sup>°C</sup>
                </Typography>
                <Box
                  sx={{ display: "block", mx: "auto" }}
                  component="img"
                  alt="condition"
                  src={weather.current.condition.icon}
                />
                <Typography variant="h6" align="center">
                  {weather.current.condition.text}
                </Typography>
              </CardContent>
            </Grow>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default App;
