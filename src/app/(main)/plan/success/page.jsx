
import { getSessionData } from '@/lib/session/getSession'
import { stripe } from '@/lib/stripe'
import { Card, Button } from '@heroui/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CircleCheck, ArrowLeft } from '@gravity-ui/icons';
import { createSubs } from '@/lib/actions/action'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const user = await getSessionData()
  const customerEmail = user.email

  if (!session_id) throw new Error('Invalid session_id')

 const session = await stripe.checkout.sessions.retrieve(session_id, {
  expand: ['invoice.payment_intent']
})

if (session.status === 'open') return redirect('/')

const amount = session.amount_total / 100;
const currency = session.currency.toUpperCase();
const paymentStatus = session.payment_status;
const transactionId = session.invoice?.payment_intent?.id ?? session.invoice?.id ?? null;
const paymentDate = new Date(session.created * 1000).toLocaleDateString();

const subInfo = {
  customerEmail,
  planId: session.metadata?.planId,
  amount,
  currency,
  paymentStatus,
  transactionId,
  subscriptionId: session.subscription,
  invoiceId: typeof session.invoice === 'string' ? session.invoice : session.invoice?.id,
  paymentDate,
  sessionId: session_id,
}

  await createSubs(subInfo)

  return (
    <section className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-950 border border-zinc-800/80 shadow-2xl p-2 rounded-2xl">
        
        {/* Card Header (Title & Description) */}
        <Card.Header className="flex flex-col items-center pt-8 pb-4 text-center">
          <div className="mb-4 p-3 bg-indigo-600/10 text-indigo-500 rounded-full">
            <CircleCheck width={40} height={40} />
          </div>
          <Card.Title className="text-xl font-bold text-white tracking-tight">
            Payment Successful
          </Card.Title>
          <Card.Description className="text-sm text-zinc-400 mt-1">
            Your subscription is now active.
          </Card.Description>
        </Card.Header>

        {/* Card Content (Main Details) */}
        <Card.Content className="px-6 py-2 space-y-4">
          <div className="bg-zinc-900/40 rounded-xl p-4 border border-zinc-900 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Amount Paid</span>
              <span className="text-indigo-400 font-semibold">{amount} {currency}</span>
            </div>
            
            <div className="h-[1px] bg-zinc-800/50 w-full" />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Transaction ID</span>
              <span className="text-zinc-300 font-mono text-xs truncate max-w-[150px]">{transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">Date</span>
              <span className="text-zinc-300">{paymentDate}</span>
            </div>
          </div>

          <p className="text-xs text-center text-zinc-500 leading-relaxed max-w-[300px] mx-auto">
            A confirmation email has been sent to <span className="text-zinc-300">{customerEmail}</span>.
          </p>
        </Card.Content>

        {/* Card Footer (Actions) */}
        <Card.Footer className="px-6 pb-6 pt-4">
          <Link
          href="/"
           className="w-full h-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex justify-center items-center"
          >
          <Button
          variant='ghost' 
          className={'bg-transparent'}
          >
          <ArrowLeft width={16} />
            Back to Dashboard
          </Button>
          </Link>
          
        </Card.Footer>

      </Card>
    </section>
  )
}