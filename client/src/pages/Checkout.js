import React from 'react';
import { useUser } from './UserContext'; // Import the hook to get the current user
import { useGetUserCart } from './userServices'; // Import the hook for fetching user's cart
import { useAddOrder } from './orderServices'; // Import the hook for adding an order

const CheckoutPage = () => {
  const { userId } = useUser(); // Get the current user from the context
  const { data: cartData, loading: cartLoading, error: cartError } = useGetUserCart(userId); // Fetch user's cart
  const { addOrder } = useAddOrder(); // Hook for adding an order

  const handleCheckout = async () => {
    if (!cartData || cartLoading || cartError) return;

    try {
      // Extract items from cart data
      const items = cartData.map(cartItem => ({
        product: cartItem.product._id, // Assuming cartItem.product is the product object
        quantity: cartItem.quantity
      }));

      // Add order
      await addOrder(userId, items);

      // Display success message or navigate to order confirmation page
      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      // Display error message to the user
    }
  };

  if (cartLoading) return <p>Loading...</p>;
  if (cartError) return <p>Error fetching cart data: {cartError.message}</p>;

  return (
    <div>
      <h2>Checkout Page</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
