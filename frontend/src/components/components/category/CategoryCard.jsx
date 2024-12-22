export default function CategoryCard({ category }) {
  const { name, icon } = category;

  return (
    <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
}