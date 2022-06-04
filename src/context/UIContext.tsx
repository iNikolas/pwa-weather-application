import React, { createContext, useState } from "react";
import { Alert, Snackbar, AlertColor } from "@mui/material";

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

type SetAlertType = React.Dispatch<React.SetStateAction<AlertProps>>;

interface UIContextProps {
  setAlert: SetAlertType;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

export const UIContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: "info",
    message: "",
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
};
