import { getSessionData } from '@/lib/session/getSession'
import { stripe } from '@/lib/stripe'
import { Card } from '@heroui/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import {CircleCheck} from '@gravity-ui/icons';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const user = await getSessionData()
  const customerEmail = user.email
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p className='text-white/70 font-bold text-center w-11/12 mx-auto my-10'>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
          <Card className="w-[400px] px-2 py-1">
      <Card.Header className="flex-col items-start gap-2 pb-0">
        <CircleCheck
          aria-label="Order confirmed icon"
          className="text-success size-6"
          role="img"
        />
        <Card.Title className="text-base">Thank you for your order!</Card.Title>
      </Card.Header>

      <Card.Body className="py-3">
        <Card.Description className="text-sm leading-relaxed">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-semibold text-foreground">{customerEmail}</span>.
          If you have any questions, please email{" "}
        </Card.Description>
      </Card.Body>

      <Card.Footer className="pt-0">
        <Link
          aria-label="Email orders support"
          href="mailto:orders@example.com"
          size="sm"
        >
          orders@example.com
          <Link.Icon aria-hidden="true" />
        </Link>
      </Card.Footer>
    </Card>
      </section>
    )
  }
}