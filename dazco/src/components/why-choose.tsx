import { WHY_CHOOSE, type Reason } from "@/lib/why-choose";

function ReasonIcon({ icon }: { icon: Reason["icon"] }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.6,
    stroke: "currentColor",
    className: "h-6 w-6",
    "aria-hidden": true,
  } as const;

  switch (icon) {
    case "location":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6.429 9.75 2.077 2.302m0 0L9 15.75l-4.5-3.75 1.929-2.25m2.077 2.302L15 3m5.571 6.75-2.077 2.302m0 0L15 15.75l4.5-3.75-1.929-2.25M12 21v-2.25"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      );
  }
}

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why choose Dazco
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            The dependable partner for your facilities.
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((reason, index) => (
            <div
              key={reason.title}
              className={`flex flex-col gap-4 border-t-4 bg-white p-8 shadow-sm shadow-primary/5 ${
                index % 2 === 0 ? "border-primary" : "border-secondary"
              }`}
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  index % 2 === 0
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary/15 text-secondary"
                }`}
              >
                <ReasonIcon icon={reason.icon} />
              </span>
              <h3 className="text-lg font-semibold text-neutral">
                {reason.title}
              </h3>
              <p className="text-sm leading-6 text-neutral-soft">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
