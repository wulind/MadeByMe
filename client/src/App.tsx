import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import PatternsPage from "./components/pages/PatternsPage";
import Home from "./components/pages/home/Home";
import { CheckoutForm } from "./components/pages/checkout/CheckoutForm";
import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

// Call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51RCm0cGdkU36Z3bITNewzpt3NUs3So53x6jx1Xi9a9VlLZcBK6Dcn7zCSHZxzoP0DCFKrTaXnZlDlcvke4TawMB2002Mns49kH"
);

const fetchClientSecret = () => {
  return fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => json.clientSecret);
};

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

const App = () => {
  return (
    <Router>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <Routes>
          <Route path="/" Component={Home} />
          <Route
            path="/product/:productId"
            element={
              <ProductPage productId="bad35b6d-58a9-4fd3-91e0-076b0366f2fe" />
            }
          />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/patterns" element={<PatternsPage />} />
        </Routes>
      </EmbeddedCheckoutProvider>
    </Router>
  );
};

export default App;
