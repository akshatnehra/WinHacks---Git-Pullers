import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar"; 

const GameDetails = () => {
  const { gameId } = useParams();

  // Dummy data
  const game = {
    id: gameId,
    title: `Game Title ${gameId}`,
    imageUrl: `https://source.unsplash.com/random/640x360?game&sig=${gameId}`, 
    description:
      "Embark on a journey through mystical lands and unravel the mysteries of ancient powers. This game offers an immersive experience with stunning visuals, captivating storytelling, and dynamic gameplay. Join the adventure and become a legend.",
    price: "59.99",
    screenshots: [
      `https://source.unsplash.com/random/640x360?gameplay&sig=${gameId + 1}`,
      `https://source.unsplash.com/random/640x360?gameplay&sig=${gameId + 2}`,
      `https://source.unsplash.com/random/640x360?gameplay&sig=${gameId + 3}`,
    ],
  };

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
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded-3xl">
                    Buy Now
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-3xl">
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
