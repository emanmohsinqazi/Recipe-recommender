import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <>
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>Generate Recipe</h1>
          {/* <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"> */}
          <Link className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300" to={"/generate"}>Lets Generate</Link>  
          {/* </button> */}
        </div>
        <div className="md:w-1/2">
          <img
            src="/basket-image.png?height=300&width=300 rounded-full"
            alt="Fruit Basket"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </>
  )
}

export default Hero