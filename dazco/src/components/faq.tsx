import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="bg-secondary/[0.07]">
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            FAQ
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Common questions about coverage, contracts, and response times.
          </h2>
        </div>

        <div className="divide-y divide-secondary/15 border-y border-secondary/15 bg-white px-6 shadow-sm shadow-secondary/5">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold text-neutral transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
