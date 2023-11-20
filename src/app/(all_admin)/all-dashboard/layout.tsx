import { SideBar } from "./components/shared/SideBar";



export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="flex">
    <SideBar />
    <div className="flex-1">{children}</div>
  </div>
  );
}