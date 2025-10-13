import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import {
  useYupValidationResolver,
  validationSchema,
} from "../../../src/components/form/schema"

type FormData = {
  name: string
  email: string
  subject: string
  text: string
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formHeight, setFormHeight] = useState<number | undefined>(undefined)
  const formRef = useRef<HTMLFormElement | null>(null)

  const resolver = useYupValidationResolver(validationSchema)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver })

  const encode = (data: Record<string, unknown>) =>
    Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            data[key] as string,
          )}`,
      )
      .join("&")

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error(error)
      alert("Sorry, something went wrong. Try again in a moment.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight)
    }
  }, [isSubmitted])

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center font-montserrat">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="contact-form"
            ref={formRef}
            data-netlify="true"
            name="contact"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 rounded-2xl border border-accent/20 bg-secondary/10 p-6 shadow-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            style={{ minHeight: formHeight }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="flex flex-col gap-4 md:flex-row">
              <label className="w-full text-sm">
                <span className="mb-1 block font-semibold uppercase tracking-wide text-secondary-text">
                  Name
                </span>
                <input
                  {...register("name")}
                  placeholder="Jane Doe"
                  className={`w-full rounded-md border px-4 py-2 text-main-text placeholder:text-secondary-text/70 shadow-sm transition focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-0 bg-white/90 dark:bg-primary/40 ${errors.name ? "border-red-500" : "border-accent/40"
                    }`}
                />
                {errors.name && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>

              <label className="w-full text-sm">
                <span className="mb-1 block font-semibold uppercase tracking-wide text-secondary-text">
                  Email
                </span>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className={`w-full rounded-md border px-4 py-2 text-main-text placeholder:text-secondary-text/70 shadow-sm transition focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-0 bg-white/90 dark:bg-primary/40 ${errors.email ? "border-red-500" : "border-accent/40"
                    }`}
                />
                {errors.email && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-1 block font-semibold uppercase tracking-wide text-secondary-text">
                Subject
              </span>
              <input
                {...register("subject")}
                placeholder="How can I help?"
                className={`w-full rounded-md border px-4 py-2 text-main-text placeholder:text-secondary-text/70 shadow-sm transition focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-0 bg-white/90 dark:bg-primary/40 ${errors.subject ? "border-red-500" : "border-accent/40"
                  }`}
              />
              {errors.subject && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.subject.message}
                </span>
              )}
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-semibold uppercase tracking-wide text-secondary-text">
                Message
              </span>
              <textarea
                {...register("text")}
                rows={6}
                placeholder="Tell me about your project, challenge, or idea..."
                className={`w-full rounded-md border px-4 py-2 text-main-text placeholder:text-secondary-text/70 shadow-sm transition focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-0 bg-white/90 dark:bg-primary/40 ${errors.text ? "border-red-500" : "border-accent/40"
                  }`}
              />
              {errors.text && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.text.message}
                </span>
              )}
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center rounded-md bg-highlight px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isLoading ? "Sending..." : "Send message"}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="contact-success"
            className="flex w-full flex-col items-center gap-3 rounded-2xl border border-accent/20 bg-secondary/10 p-8 text-center shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: formHeight }}
          >
            <h3 className="text-2xl font-semibold text-main-text">
              Thanks for reaching out! 👋
            </h3>
            <p className="max-w-md text-secondary-text">
              I’ll review your message and get back to you as soon as possible.
              If it’s urgent, feel free to nudge me on LinkedIn.
            </p>
            <button
              type="button"
              className="rounded-md border border-highlight px-4 py-2 text-highlight transition hover:bg-highlight hover:text-white"
              onClick={() => setIsSubmitted(false)}
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactForm
