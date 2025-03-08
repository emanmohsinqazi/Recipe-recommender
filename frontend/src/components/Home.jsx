import { useNavigate } from "react-router-dom"

const Card = ({ title, description, icon, route }) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-xl transform hover:-translate-y-1"
      onClick={() => navigate(route)}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

const Home = () => {
  return (
    <div className="flex-1 p-8 overflow-auto bg-[#0f0f10] text-white ml-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Smart Recipe Grocer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <Card
          title="Recipe Recommendation"
          description="Discover new recipes tailored to your preferences and dietary needs."
          icon="🍳"
          route="/recipes"
        />
        <Card
          title="Grocery Store"
          description="Shop for ingredients and manage your grocery list effortlessly."
          icon="🛒"
          route="/shop"
        />
        <Card
          title="Kitchen Management"
          description="Keep track of your pantry and plan your meals efficiently."
          icon="📊"
          route="/kitchen"
        />
        <Card
          title="Kitchen Assistant"
          description="Chat with our AI assistant for cooking tips and recipe advice."
          icon="🤖"
          route="/chatbot"
        />
      </div>
    </div>
  )
}

export default Home

