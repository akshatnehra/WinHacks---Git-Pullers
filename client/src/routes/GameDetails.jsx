import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";

const GameDetails = () => {
  const { gameId } = useParams();
  const [ game, setGame ] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_BASE_URL + "/gameItems/" + gameId
        ); // Assuming `gameId` is available
        const data = await response.json();
        
        let gameData = {
          id: data._id,
          title: data.title,
          imageUrl: data.banner,
          description: data.description,
          price: data.originalPrice,
          screenshots: data.screenshots,
        }

        setGame(gameData); // Assuming you have a state [gameData, setGameData] to hold this data
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    };

    fetchGameData();
  }, [gameId]);

  const { addToCart } = useCart();

  const handleAddToCart = (game) => {
    addToCart(game);
    console.log("Added to cart:", game);
  };

  // Conditional rendering before data is loaded
  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pt-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-72 object-cover"
              src={game.imageUrl}
              alt={`${game.title} Cover`}
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {game.title}
              </h2>
              <p className="text-gray-600 text-lg mb-4">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-600">{`$${game.price}`}</span>
                <div>
                  <button
                    onClick={() => handleAddToCart(game)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-3xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Screenshots</h3>
                <div className="flex space-x-4 overflow-x-auto">
                  {game.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      className="flex-shrink-0 h-48 rounded-lg"
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
