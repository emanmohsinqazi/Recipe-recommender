/* eslint-disable react/prop-types */
import Header from './Header';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}