import React,{ useState } from 'react'
import NavBar from '../components/NavBar'

const Home = () => {
  const itemName = "FIREIMG";
  const itemPrice = 500;  // Added 'const' keyword here
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };
  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", 
        body: JSON.stringify({
          items: [{ id: 1, 
                    quantity:quantity,
                    price:itemPrice,
                    name:itemName
                  },
                ]
        }) 
      });

      const data = await res.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <p>Item: {itemName}</p>
      <p>Price: ${itemPrice}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Amount: ${finalAmount}</p>
      <button onClick={decrement}>Decrease Quantity</button>
      <button onClick={increment}>Increase Quantity</button>
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}

export default Home
