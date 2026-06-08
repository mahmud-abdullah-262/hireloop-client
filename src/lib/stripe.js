import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const Plan_Price_Id = {
'seeker_pro' : 'price_1Tg2S2FjCEcL1wHZdor3vVTv',
'seeker_premium' : 'price_1Tg5avFjCEcL1wHZoU58izxu',
'recruiter_growth' : 'price_1Tg5bbFjCEcL1wHZgUXUGiQy',
'recruiter_enterprise' : 'price_1Tg5cIFjCEcL1wHZT6VE5bja',
}