import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import CheckoutForm from "./components/pages/checkout/CheckoutForm";
import { ReactLenis } from "lenis/react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");

// Call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51RCm0cGdkU36Z3bITNewzpt3NUs3So53x6jx1Xi9a9VlLZcBK6Dcn7zCSHZxzoP0DCFKrTaXnZlDlcvke4TawMB2002Mns49kH"
);

const fetchClientSecret = () => {
  return fetch("/create-checkout-session", { method: "POST" })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ReactLenis
        options={{
          autoRaf: true,
          duration: 0.7,
        }}
        root
      >
        <CheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <CheckoutForm />
        </CheckoutProvider>
      </ReactLenis>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
