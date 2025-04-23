import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from 'lucide-react'

// Import Lucide icons - make sure to install with: npm install lucide-react
import { ChefHat, ShoppingCart, LayoutGrid, Bot } from 'lucide-react'

const Card = ({ title, description, icon, route }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-white/30 overflow-hidden group"
      onClick={() => navigate(route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <div className="text-5xl bg-white/30 p-4 rounded-full shadow-md">{icon}</div>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">{title}</h2>
        <p className="text-gray-700 text-center mb-4">{description}</p>

        <div
          className={`flex justify-center items-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-purple-800 font-medium flex items-center">
            Explore <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const features = [
    {
      title: "Recipe Recommendation",
      description: "Discover new recipes tailored to your preferences and dietary needs.",
      icon: <ChefHat className="h-8 w-8 text-purple-700" />,
      route: "/recipes",
    },
    {
      title: "Grocery Store",
      description: "Shop for ingredients and manage your grocery list effortlessly.",
      icon: <ShoppingCart className="h-8 w-8 text-purple-700" />,
      route: "/shop",
    },
    {
      title: "Kitchen Management",
      description: "Keep track of your pantry and plan your meals efficiently.",
      icon: <LayoutGrid className="h-8 w-8 text-purple-700" />,
      route: "/kitchen",
    },
    {
      title: "Kitchen Assistant",
      description: "Chat with our AI assistant for cooking tips and recipe advice.",
      icon: <Bot className="h-8 w-8 text-purple-700" />,
      route: "/chatbot",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" 
         style={{ 
           background: "linear-gradient(to right, #bfdbfe, #e9d5ff)" 
         }}>
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">Welcome to Smart Recipe Grocer</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your all-in-one solution for recipe discovery, grocery shopping, and kitchen management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              route={feature.route}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home