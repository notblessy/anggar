"use client";

import * as Toast from "@radix-ui/react-toast";
import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import { createContext, useContext, useState } from "react";

type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const showToast = (
    msg: string,
    toastType: "success" | "error" | "info" = "info"
  ) => {
    setMessage(msg);
    setType(toastType);
    setOpen(true);
  };

  const toastTypeColor = {
    success: "#6bd731",
    error: "#f21616",
    info: "#099cff",
    warning: "#fc8c0c",
  };

  const toastTypeIcon = {
    success: <CircleCheck color="#6bd731" />,
    error: <CircleX color="#f21616" />,
    info: <Info color="#099cff" />,
    warning: <CircleAlert color="#fc8c0c" />,
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={true}
          onOpenChange={setOpen}
          style={{
            width: "300px",
            backgroundColor: "#fff9e6",
            padding: "10px 20px 10px 10px",
            borderRadius: "5px 0 0 5px",
            borderLeft: `5px solid ${toastTypeColor[type]}`,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s",
            transform: `translateX(${open ? "0" : "120%"})`,
          }}
        >
          <div className="flex gap-3 items-center">
            {toastTypeIcon[type]}
            <div className="flex flex-col w-full ">
              <Toast.Title className="font-bold text-sm">
                {type.toUpperCase()}
              </Toast.Title>
              <Toast.Description className="text-xs">
                {message}
              </Toast.Description>
            </div>
            <div className="flex flex-row justify-end">
              <div>
                <Toast.Close
                  className="cursor-pointer"
                  style={{ width: "16px", height: "16px" }}
                >
                  <X className="text-gray-300 hover:text-gray-800" size="sm" />
                </Toast.Close>
              </div>
            </div>
          </div>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 w-80 max-w-full flex flex-col gap-2 p-2" />
      </Toast.Provider>
      {children}
    </ToastContext.Provider>
  );
};
