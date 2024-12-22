export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-primary text-white px-6 py-2 hover:bg-primary/90',
    secondary: 'bg-white text-primary border-2 border-primary px-6 py-2 hover:bg-primary hover:text-white',
    outline: 'bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}