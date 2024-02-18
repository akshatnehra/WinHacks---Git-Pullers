import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar"; 

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const categories = ["All", "Adventure", "Racing", "Puzzle", "Action"];

  useEffect(() => {

    const fetchGames = async () => {
      // Featured games at top of the page
      const allCategories = ["Featured", ...categories.slice(1)]; 
      const gameImages = await Promise.all(
        allCategories.map(async (category, index) => ({
          id: index,
          title: `${category} Game ${index + 1}`,
          category,
          imageUrl: `https://source.unsplash.com/random/400x300?${category.toLowerCase()}`,
          featured: Math.random() < 0.5, 
          price: `$${(Math.random() * 50 + 15).toFixed(2)}`, 
        }))
      );
      setGames(gameImages);
      setFilteredGames(gameImages.filter(game => game.featured || selectedCategory === 'All')); 
    };

    fetchGames();
  }, [selectedCategory]); 

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search term when category changes
    // Filter games based on the selected category
    setFilteredGames(games.filter(game => category === 'All' ? game.featured : game.category === category));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <section className="container mx-auto px-4">
        {/* Featured Games Section */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-center">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {games.filter(game => game.featured).map((game) => (
              <div key={game.id} className="bg-white shadow rounded-lg p-4">
                <img src={game.imageUrl} alt={game.title} className="rounded-md w-full h-48 object-cover" />
                <h3 className="mt-2 font-bold">{game.title}</h3>
                <p>{game.price}</p>
                <div className="flex justify-between mt-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buy Now</button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Welcome Message */}
        <div className="text-center mt-12">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Rocket Games Marketplace</h1>
          <p className="mt-4 text-lg text-gray-700">Explore our curated list of games</p>
        </div>
        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full md:w-2/3 lg:w-1/2 py-2 px-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {/* Search functionality todo */}}
            className="ml-4 px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Search
          </button>
        </div>
        {/* Categories */}
        <div className="mt-12 flex justify-center flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-900'}`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-white shadow rounded-lg p-4">
              <img src={game.imageUrl} alt={game.title} className="rounded-md w-full h-48 object-cover" />
              <h3 className="mt-2 font-bold">{game.title}</h3>
              <p>{game.price}</p>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buy Now</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
