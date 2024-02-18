import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const categories = ["All", "Adventure", "Racing", "Puzzle", "Action"];

  useEffect(() => {
    const fetchGames = async () => {
      const gamesData = await fetch(
        import.meta.env.VITE_REACT_APP_BASE_URL + "/gameItems"
      );
      const data = await gamesData.json();
      console.log(data);
      const gameData = [];

      data.forEach((element) => {
        gameData.push({
          id: element._id,
          title: element.title,
          category: element.category,
          imageUrl: element.banner,
          // Featured if its inside elements.tags array
          featured: element.tags.some(
            (tag) => tag.toLowerCase() === "featured"
          ),
          price: element.originalPrice,
        });
      });

      setGames(gameData);
      setFilteredGames(
        gameData.filter((game) => game.featured || selectedCategory === "All")
      );
    };

    fetchGames();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category); // Debugging

    const updatedFilteredGames =
      category === "All"
        ? games
        : games.filter(
            (game) => game.category.toLowerCase() === category.toLowerCase()
          );

    console.log("Filtered Games:", updatedFilteredGames); // Debugging
    setFilteredGames(updatedFilteredGames);
  };

  const { addToCart } = useCart();

  const handleAddToCart = (e, game) => {
    e.stopPropagation();
    addToCart(game);
    console.log("Added to cart:", game);
  };

  const handleSearchGames = () => {
    // Filter games based on the search term
    setFilteredGames(
      games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setFilteredGames(
      games.filter((game) =>
        selectedCategory === "All" ? game : game.category === selectedCategory
      )
    );
  };

  let navigate = useNavigate();
  const handleClickOnCard = (game) => {
    // Navigate to /game/:id
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <section className="container mx-auto px-4">
        {/* Featured Games Section */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-center">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {games
              .filter((game) => game.featured)
              .map((game) => (
                <div
                  key={game.id}
                  className="cursor-pointer bg-white shadow rounded-lg p-4"
                  onClick={() => handleClickOnCard(game)}
                >
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="rounded-md w-full h-48 object-cover"
                  />
                  <h3 className="mt-2 font-bold">{game.title}</h3>
                  <p>${game.price}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={(e) => handleAddToCart(e, game)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Welcome Message */}
        <div className="text-center mt-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Rocket Games Marketplace
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Explore our curated list of games
          </p>
        </div>
        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // When enter key is pressed, search for games
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchGames();
              }
            }}
            className="block w-full md:w-2/3 lg:w-1/2 py-2 px-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              handleSearchGames();
            }}
            className="ml-4 px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Search
          </button>
          <button
            onClick={() => {
              handleClearSearch();
            }}
            className="ml-4 px-6 py-2 border-2 text-white rounded-md text-black hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
        {/* Categories */}
        <div className="mt-12 flex justify-center flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white shadow rounded-lg p-4 cursor-pointer"
              onClick={() => handleClickOnCard(game)}
            >
              <img
                src={game.imageUrl}
                alt={game.title}
                className="rounded-md w-full h-48 object-cover"
              />
              <h3 className="mt-2 font-bold">{game.title}</h3>
              <p>${game.price}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => handleAddToCart(e, game)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
