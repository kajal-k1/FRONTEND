

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const token = localStorage.getItem('token');
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 0;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getFormattedItems = () => {
    return cartItems.map((item) => ({
      productId: item._id || item.productId,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
    }));
  };

  const saveOrder = async (data) => {
    const res = await fetch('http://100.55.22.162:5000/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Order creation failed');
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    try {
      const orderRes = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await orderRes.json();
      if (!orderData.id) throw new Error('Failed to create Razorpay order');

      const options = {
        key: 'rzp_test_Y1kcSeVyzZAk1J',
        amount: orderData.amount,
        currency: 'INR',
        name: 'Your Shop',
        description: 'Order Payment',
        order_id: orderData.id,
        handler: async (response) => {
          const paymentId = response.razorpay_payment_id;
          const formattedItems = getFormattedItems();

          await saveOrder({
            customer: formData,
            items: formattedItems,
            totalAmount,
            paymentMethod: 'Razorpay',
            paymentId,
            status: 'Paid',
          });

          clearCart();
          navigate('/success');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order save failed:', err.message);
      alert(err.message);
    }
  };

  const handleCOD = async () => {
    try {
      const formattedItems = getFormattedItems();

      await saveOrder({
        customer: formData,
        items: formattedItems,
        totalAmount,
        paymentMethod: 'COD',
        paymentId: null,
        status: 'Pending',
      });

      clearCart();
      navigate('/success');
    } catch (err) {
      console.error(' COD order save failed:', err.message);
      alert(err.message);
    }
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, email, street, city, state, zipcode } = formData;
    if (!firstName || !lastName || !email || !street || !city || !state || !zipcode) {
      alert('Please fill all shipping details.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Cart is empty.');
      return;
    }

    if (paymentMethod === 'razorpay') {
      handlePayment();
    } else if (paymentMethod === 'cod') {
      handleCOD();
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
        <input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleInputChange} required />

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay with Razorpay
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <div className="summary">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping: ₹{shippingFee}</p>
          <p><strong>Total: ₹{totalAmount}</strong></p>
        </div>

        <button type="button" onClick={handlePlaceOrder}>Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
