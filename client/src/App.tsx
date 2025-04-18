import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ROUTES } from "./assets/strings/routes";
import PatternsPage from "./components/pages/PatternsPage";
import ProductPage from "./components/pages/ProductPage";
import { CheckoutForm } from "./components/pages/checkout/CheckoutForm";
import Home from "./components/pages/home/Home";
import HeroSection from "./components/pages/home/TitleSection";

// Call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const fetchClientSecret = () => {
  return fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => json.clientSecret);
};

const App = () => {
  return (
    <Router>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <Routes>
          <Route index Component={Home} />
          <Route
            path={`${ROUTES.PRODUCTS}/:productId`}
            element={<ProductPage />}
          />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutForm />} />
          <Route
            path={ROUTES.COLLECTIONS.PATTERNS}
            element={<PatternsPage />}
          />
        </Routes>
      </EmbeddedCheckoutProvider>
    </Router>
  );
};

export default App;
