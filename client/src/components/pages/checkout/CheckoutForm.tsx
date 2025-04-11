import { FormEvent, useCallback, useEffect, useState } from "react";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";

// const validateEmail = async (
//   email: string,
//   checkout: ReturnType<typeof useCheckout>
// ) => {
//   const updateResult = await checkout.updateEmail(email);
//   const isValid = updateResult.type !== "error";

//   return { isValid, message: !isValid ? updateResult.error.message : null };
// };

// const EmailInput = ({
//   email,
//   setEmail,
//   error,
//   setError,
// }: {
//   email: string;
//   setEmail: (email: string) => void;
//   error: string | null;
//   setError: (error: string | null) => void;
// }) => {
//   const checkout = useCheckout();

//   const handleBlur = async () => {
//     if (!email) {
//       return;
//     }

//     const { isValid, message } = await validateEmail(email, checkout);
//     if (!isValid) {
//       setError(message);
//     }
//   };

//   const handleChange = (e: FormEvent) => {
//     setError(null);
//     setEmail(e.currentTarget.nodeValue ?? "");
//   };

//   return (
//     <>
//       <label>
//         Email
//         <input
//           id="email"
//           type="text"
//           value={email}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder="you@example.com"
//         />
//       </label>
//       {error && <div id="email-errors">{error}</div>}
//     </>
//   );
// };

// const CheckoutForm = () => {
//   const checkout = useCheckout();

//   const [email, setEmail] = useState<string>("");
//   const [emailError, setEmailError] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     setIsLoading(true);

//     const { isValid, message } = await validateEmail(email, checkout);
//     if (!isValid) {
//       setEmailError(message ?? null);
//       setMessage(message ?? null);
//       setIsLoading(false);
//       return;
//     }

//     const confirmResult = await checkout.confirm();

//     if (confirmResult.type === "error") {
//       // Handle the error case
//       setMessage(confirmResult.error.message);
//     } else {
//       // Handle the success case or redirection
//       setMessage("Payment confirmation in progress...");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <EmailInput
//         email={email}
//         setEmail={setEmail}
//         error={emailError}
//         setError={setEmailError}
//       />
//       <h4>Payment</h4>
//       <PaymentElement id="payment-element" />
//       <button disabled={isLoading} id="submit">
//         <span id="button-text">
//           {isLoading ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             `Pay ${checkout.total.total.amount} now`
//           )}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

export const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return <EmbeddedCheckout />;
};

export const Return = () => {
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
