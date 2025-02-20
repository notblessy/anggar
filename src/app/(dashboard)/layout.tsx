export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex flex-col items-center">{children}</div>;
}
