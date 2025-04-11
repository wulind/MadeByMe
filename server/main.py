# server/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")
app = FastAPI()

# Replace this with your real Stripe secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", api_key)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create-payment-intent")
async def create_payment_intent(request: Request):
    data = await request.json()
    amount = data.get("amount", 1000)  # $10.00 as default

    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True}
        )
        return {"clientSecret": intent["client_secret"]}
    except Exception as e:
        return {"error": str(e)}
