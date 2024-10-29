import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, className }) => {
  return (
    <div className={`flex bg-gray-50 flex-col min-h-screen ${className}`}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;