import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { ArrowRight } from "@gravity-ui/icons";

export default function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
     {/* Layer 1: Gradient - সবচেয়ে নিচে */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 bg-[url('/images/Gradient.png')] bg-top bg-cover bg-no-repeat"
  />

  {/* Layer 2: CTA background - Gradient এর উপরে */}
  <div
    aria-hidden="true"
    className="absolute inset-0 z-10 bg-[url('/images/cta-bg.png')] bg-top bg-cover bg-no-repeat"
  />

      {/* Vignette — কোণাগুলো খাঁটি কালোর দিকে ফেইড করে */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_25%,transparent_35%,#000_100%)]"
      />

      {/* নিচের ফেইড — টেক্সট কন্ট্রাস্ট + পরের সেকশনের সাথে সিমলেস ব্লেন্ড */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <h2 className=" text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mt-5 max-w-md  text-sm text-white/60 sm:text-base">
          Build a profile in three minutes. The matches start arriving
          tomorrow morning.
        </p>

        <Link
          href="/signup"
          className={buttonVariants({
            variant: "primary",
            size: "lg",
            className:
              "mt-9 gap-2 rounded-full bg-white px-7  font-medium text-black hover:bg-white/90",
          })}
        >
          Create a free account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
