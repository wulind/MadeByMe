// App.tsx
import React, { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success",
      },
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isLoading || !stripe || !elements}>
        {isLoading ? "Processing…" : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

const StripeContainer: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }), // $10.00
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div>Loading payment form…</div>
  );
};

export default StripeContainer;
