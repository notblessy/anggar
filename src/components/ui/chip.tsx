const Chip = ({
  label,
  type,
  fontSize = 14, // Default font size is 14px
}: {
  label: string;
  type: "danger" | "warning" | "info" | "success";
  fontSize?: number; // Customizable font size in px
}) => {
  const typeStyles = {
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-3 py-1 font-medium rounded-full ${typeStyles[type]}`}
      style={{ fontSize: `${fontSize}px` }} // Apply dynamic font size
    >
      {label}
    </span>
  );
};

export default Chip;
