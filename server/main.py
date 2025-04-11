# server/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend dev server to talk to backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", api_key)

YOUR_DOMAIN = 'http://localhost:4242'
@app.post('/create-checkout-session')
def create_checkout_session(request: Request):
    try:
        session = stripe.checkout.Session.create(
            ui_mode = 'embedded',
            line_items=[{"price": "price_1RCp23GdkU36Z3bIaCQnH2od", "quantity": 2}],
            mode='payment',
            return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        print("Error creating checkout session:", e)
        return str(e)

    return {"clientSecret": session.client_secret}

@app.route('/session-status')
def session_status():
  session = stripe.checkout.Session.retrieve(Request.args.get('session_id'))

  return {"status": session.status, "customer_email": session.customer_details.email}


if __name__ == '__main__':
    app.run(port=4242)