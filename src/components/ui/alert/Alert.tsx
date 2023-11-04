'use client';
import { useContext } from "react";
import { Alert as AlertMT } from "@/components/helpers/mt-exporter";
import { AlertContext } from "@/providers/AlertContext";
import { colors } from "@material-tailwind/react/types/generic";

const Alert = () => {
  const { alertOpen, message, type } = useContext(AlertContext);

  const typeColors = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
  };

  return <AlertMT open={alertOpen} color={typeColors[type] as colors} className="w-full fixed z-[9999] bg-opacity-60 backdrop-blur-md">
    {message}
  </AlertMT>;
};

Alert.displayName = "Alert";

export default Alert;