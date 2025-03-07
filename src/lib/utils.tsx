import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = {
  categories: [
    {
      name: "Home",
      type: "expense",
    },
    {
      name: "Food",
      type: "expense",
    },
    {
      name: "Health",
      type: "expense",
    },
    {
      name: "Beauty",
      type: "expense",
    },
    {
      name: "Entertainment",
      type: "expense",
    },
    {
      name: "Transportation",
      type: "expense",
    },
    {
      name: "Bills",
      type: "expense",
    },
    {
      name: "Other",
      type: "expense",
    },
    {
      name: "Salary",
      type: "income",
    },
    {
      name: "Payment",
      type: "income",
    },
    {
      name: "Other",
      type: "income",
    },
  ],
};
