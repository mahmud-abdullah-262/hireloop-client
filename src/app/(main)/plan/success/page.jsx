import { getSessionData } from '@/lib/session/getSession'
import { stripe } from '@/lib/stripe'
import { Card } from '@heroui/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import {CircleCheck} from '@gravity-ui/icons';
import { createSubs } from '@/lib/actions/action'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const user = await getSessionData()
  const customerEmail = user.email
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const subInfo = {
      email : customerEmail,
      planId : metadata.planId
    }

    const subsData = await createSubs(subInfo)
    console.log("subscription data:", subsData)


    return (
      <section id="success">
        <p className='text-white/70 font-bold text-center w-11/12 mx-auto my-10'>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
         
      </section>
    )
  }
}