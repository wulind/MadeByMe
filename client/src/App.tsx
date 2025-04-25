import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ROUTES } from "./assets/strings/routes";
import PatternsPage from "./components/pages/PatternsPage";
import { CheckoutForm } from "./components/pages/checkout/CheckoutForm";
import Home from "./components/pages/home/Home";
import HeroSection from "./components/pages/home/TitleSection";
import ProductPage from "./components/pages/products/ProductPage";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import ContactUs from "./components/pages/contactUs/ContactUs";

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
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
        </Routes>
      </EmbeddedCheckoutProvider>
    </Router>
  );
};

export default App;
