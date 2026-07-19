"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

type SubmitState = "idle" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    setSubmitState("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitState("success");
      reset();
    } catch (error) {
      setSubmitState("error");
      setServerError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-neutral">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="rounded-lg border border-neutral/15 bg-white px-4 py-2.5 text-sm text-neutral outline-none transition-colors focus:border-primary"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="rounded-lg border border-neutral/15 bg-white px-4 py-2.5 text-sm text-neutral outline-none transition-colors focus:border-primary"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-neutral">
          Phone <span className="text-neutral-soft">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          className="rounded-lg border border-neutral/15 bg-white px-4 py-2.5 text-sm text-neutral outline-none transition-colors focus:border-primary"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-neutral">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="rounded-lg border border-neutral/15 bg-white px-4 py-2.5 text-sm text-neutral outline-none transition-colors focus:border-primary"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {submitState === "success" && (
        <p className="text-sm font-medium text-green-600">
          Thanks! Your message has been sent, we&apos;ll be in touch soon.
        </p>
      )}
      {submitState === "error" && (
        <p className="text-sm font-medium text-red-600">
          {serverError ?? "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
