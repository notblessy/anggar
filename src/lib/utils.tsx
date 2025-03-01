import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = {
  categories: [
    {
      name: "Home",
      type: "EXPENSES",
    },
    {
      name: "Food",
      type: "EXPENSES",
    },
    {
      name: "Health",
      type: "EXPENSES",
    },
    {
      name: "Beauty",
      type: "EXPENSES",
    },
    {
      name: "Entertainment",
      type: "EXPENSES",
    },
    {
      name: "Transportation",
      type: "EXPENSES",
    },
    {
      name: "Bills",
      type: "EXPENSES",
    },
    {
      name: "Other",
      type: "EXPENSES",
    },
    {
      name: "Salary",
      type: "INCOME",
    },
    {
      name: "Payment",
      type: "INCOME",
    },
    {
      name: "Other",
      type: "INCOME",
    },
  ],
};
