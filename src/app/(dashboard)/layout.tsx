import Navbar from "@/components/navbar";
import SIdebar from "@/components/SIdebar";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <SIdebar></SIdebar>
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
