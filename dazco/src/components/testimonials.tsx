import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-primary">
      <div className="mx-auto flex flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-white">
            Client testimonials
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Trusted by the organizations we serve.
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className={`flex flex-col gap-6 p-8 shadow-sm ${
                index === 1
                  ? "bg-secondary text-white shadow-secondary/20"
                  : "border border-secondary/10 bg-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-8 w-8 ${
                  index === 1 ? "text-accent" : "text-primary/40"
                }`}
                aria-hidden="true"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <blockquote
                className={`text-sm leading-7 ${
                  index === 1 ? "text-white/90" : "text-neutral-soft"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption
                className={`mt-auto flex items-center gap-4 border-t pt-5 ${
                  index === 1 ? "border-white/20" : "border-neutral/10"
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    index === 1
                      ? "bg-accent text-white"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      index === 1 ? "text-white" : "text-neutral"
                    }`}
                  >
                    {testimonial.name}
                  </span>
                  <span
                    className={`text-xs ${
                      index === 1 ? "text-white/70" : "text-neutral-soft"
                    }`}
                  >
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
