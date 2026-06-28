"use client";

import { useState } from "react";
import { Card, ToggleButton, Accordion } from "@heroui/react";
import {
  CircleCheck,
  Briefcase,
  Person,
  StarFill,
  Thunderbolt,
  ShieldCheck,
  Rocket,
  House,
  ArrowRight,
} from "@gravity-ui/icons";

const jobSeekerPlans = [
  {
    id: 'seeker_free',
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with your job search journey",
    icon: <Person width={22} height={22} />,
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs/month",
      "Basic profile",
      "Email alerts",
    ],
    cta: "Get Started",
    highlight: false,
    color: "default",
  },
  {
    id: 'seeker_pro',
    name: "Pro",
    price: "$19",
    period: "month",
    description: "For serious job seekers ready to level up",
    icon: <Thunderbolt width={22} height={22} />,
    features: [
      "Apply to up to 30 jobs/month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    cta: "Start Pro",
    highlight: true,
    badge: "Most Popular",
    color: "primary",
  },
  {
    id: 'seeker_premium',
    name: "Premium",
    price: "$39",
    period: "month",
    description: "Maximum visibility and priority access",
    icon: <StarFill width={22} height={22} />,
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    cta: "Go Premium",
    highlight: false,
    color: "secondary",
  },
];

const recruiterPlans = [
  {
    id: 'recruiter_free',
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for a company's first year of hiring",
    icon: <House width={22} height={22} />,
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for early-stage hiring",
    ],
    cta: "Get Started",
    highlight: false,
    color: "default",
  },
  {
    id: 'recruiter_growth',
    name: "Growth",
    price: "$49",
    period: "month",
    description: "Scale your hiring with powerful tools",
    icon: <Rocket width={22} height={22} />,
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Growth",
    highlight: true,
    badge: "Most Popular",
    color: "primary",
  },
  {
    id: 'recruiter_enterprise',
    name: "Enterprise",
    price: "$149",
    period: "month",
    description: "For large teams with advanced hiring needs",
    icon: <ShieldCheck width={22} height={22} />,
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: false,
    color: "secondary",
  },
];

const faqItems = [
  {
    key: "cancel",
    title: "Can I cancel my subscription anytime?",
    content:
      "Yes, you can cancel anytime from your account settings. Your plan remains active until the end of the billing cycle with no additional charges.",
  },
  {
    key: "refund",
    title: "What is your refund policy?",
    content:
      "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 7 days of purchase for a full refund.",
  },
  {
    key: "payment",
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans.",
  },
  {
    key: "switch",
    title: "Can I switch between plans?",
    content:
      "Absolutely! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.",
  },
];





function PricingCard({ plan }) {
 const [isRecruiter, setIsRecruiter] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null)

const handleCheckout = async (plan) => {
  if (plan.price === "$0") return
  setLoadingPlan(plan.name)

  try {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planName: plan.name,
        planId: plan.id,
        userType: isRecruiter ? "recruiter" : "jobseeker",
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url  // ✅ এখানে redirect হবে
    }
  } catch (err) {
    console.error("Checkout error:", err)
  } finally {
    setLoadingPlan(null)
  }
}



  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        plan.highlight
          ? "border-2 border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-indigo-950"
          : "border border-default-200"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide shadow">
            {plan.badge}
          </span>
        </div>
      )}

      <Card.Header className="pt-6 pb-2 px-6 flex flex-col gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            plan.highlight
              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
              : "bg-default-100 text-default-600"
          }`}
        >
          {plan.icon}
        </div>
        <div>
          <Card.Title className="text-lg font-semibold">{plan.name}</Card.Title>
          <Card.Description className="text-sm text-default-500 mt-0.5">
            {plan.description}
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="px-6 py-4 flex-1 flex flex-col gap-6">
        <div className="flex items-end gap-1">
          <span
            className={`text-4xl font-bold tracking-tight ${
              plan.highlight ? "text-indigo-600" : "text-foreground"
            }`}
          >
            {plan.price}
          </span>
          <span className="text-default-400 text-sm mb-1.5">/{plan.period}</span>
        </div>

        <ul className="flex flex-col gap-2.5 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-default-600">
              <CircleCheck
                width={16}
                height={16}
                className={`mt-0.5 shrink-0 ${
                  plan.highlight ? "text-indigo-500" : "text-success-500"
                }`}
              />
              {f}
            </li>
          ))}
        </ul>
      </Card.Content>

<Card.Footer className="px-6 pb-6 pt-0">
  <button
    onClick={() => handleCheckout(plan)}
    disabled={plan.price === "$0" || loadingPlan === plan.name}
    className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
      plan.highlight
        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
        : "bg-default-100 hover:bg-default-200 text-foreground"
    }`}
  >
    {loadingPlan === plan.name ? (
      <>
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Redirecting...
      </>
    ) : (
      <>
        {plan.cta}
        <ArrowRight width={14} height={14} />
      </>
    )}
  </button>
</Card.Footer>
    </Card>
  );
}

export default function Plan() {
  const [isRecruiter, setIsRecruiter] = useState(false);
  const plans = isRecruiter ? recruiterPlans : jobSeekerPlans;



  

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Pricing
          </span>
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-default-500 text-base max-w-md mx-auto">
            Choose the plan that fits your needs. Upgrade or cancel anytime.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-default-100 p-1 rounded-2xl flex items-center gap-1">
            <ToggleButton
              isSelected={!isRecruiter}
              onPress={() => setIsRecruiter(false)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                !isRecruiter
                  ? "bg-white dark:bg-slate-800 shadow-sm text-foreground"
                  : "text-default-500 hover:text-foreground"
              }`}
            >
              <Person width={16} height={16} />
              For Job Seekers
            </ToggleButton>
            <ToggleButton
              isSelected={isRecruiter}
              onPress={() => setIsRecruiter(true)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                isRecruiter
                  ? "bg-white dark:bg-slate-800 shadow-sm text-foreground"
                  : "text-default-500 hover:text-foreground"
              }`}
            >
              <Briefcase width={16} height={16} />
              For Recruiters
            </ToggleButton>
          </div>
        </div>

        {/* Plan label */}
        <p className="text-center text-sm text-default-400 mb-8">
          {isRecruiter
            ? "Plans for companies to post jobs and find the best talent"
            : "Plans to help you find your next opportunity faster"}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

      {/* FAQ */}
<div className="max-w-2xl mx-auto">
  <h2 className="text-2xl font-semibold text-center text-foreground mb-2">
    Frequently asked questions
  </h2>
  <p className="text-center text-default-400 text-sm mb-8">
    Covering cancellation, refunds, payment methods, and plan switching
  </p>
  <Accordion variant="splitted" className="gap-3">
    {faqItems.map((item) => (
      <Accordion.Item key={item.key}>
        <Accordion.Heading>
          <Accordion.Trigger className="bg-default-50 dark:bg-slate-800 border border-default-200 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-foreground">
              {item.title}
            </span>
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <p className="text-sm text-white leading-relaxed pb-2 px-4">
              {item.content}
            </p>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion>
</div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-indigo-600 rounded-2xl p-10 shadow-xl shadow-indigo-200 dark:shadow-indigo-950">
          <h3 className="text-2xl font-bold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-indigo-200 text-sm mb-6">
            Our team is ready to help you find the right plan.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
