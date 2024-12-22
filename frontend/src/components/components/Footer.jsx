import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <img src="/logo.png" alt="Grocery Store" className="h-12 mx-auto mb-4" />
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Incidunt consequuntur amet culpa cum itaque neque.
        </p>
        
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Careers</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">History</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Projects</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
        </div>
        
        <div className="flex justify-center gap-6">
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebook size={24} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaInstagram size={24} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter size={24} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaGithub size={24} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaDribbble size={24} /></a>
        </div>
      </div>
    </footer>
  );
}