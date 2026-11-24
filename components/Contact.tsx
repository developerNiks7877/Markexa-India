
"use client";
import { useState, type FormEvent, type PointerEvent } from "react";
import SceneTransition from "./SceneTransition";
import MagneticButton from "./effects/MagneticButton";
import { services } from "@/data/services";
import { site } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";
import {submitContact} from "@/lib/api/contact";
type FormErrors = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
};
type FormState = "idle" | "loading" | "done" | "demo" | "fail";


const budgets = [
  "Under ₹1 lakh",
  "₹1–3 lakh",
  "₹3–10 lakh",
  "₹10 lakh+",
  "Not sure yet"
];


// 5. A helper function to check email format
function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}


// 6. Reusable component for displaying contact information
function Info({
  label,
  value,
  href
}: {
  label: string;
  value: string;
  href?: string;
}) {

  // If no information is available, show a message
  if (!value) {
    return (
      <div className="cinfo">
        <span>{label}</span>
        <p className="is-empty">
          Add {label.toLowerCase()} in data/site.ts
        </p>
      </div>
    );
  }

  // If a link is provided, display clickable information
  if (href) {
    return (
      <div className="cinfo">
        <span>{label}</span>
        <a href={href}>{value}</a>
      </div>
    );
  }

  // Otherwise, display ordinary text
  return (
    <div className="cinfo">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}


// 7. Main Contact component
export default function Contact() {

  // Store validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Store the current form state
  const [state, setState] = useState<FormState>("idle");


  // 8. Mouse-following glow effect
  function handleGlow(e: PointerEvent<HTMLDivElement>) {

    // Only activate the effect for mouse movement
    if (e.pointerType !== "mouse") {
      return;
    }

    // Get the position and dimensions of the container
    const container = e.currentTarget;
    const bounds = container.getBoundingClientRect();

    // Calculate the mouse position inside the container
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    // Pass the mouse position to CSS variables
    container.style.setProperty("--gx", `${mouseX}px`);
    container.style.setProperty("--gy", `${mouseY}px`);
  }


  // 9. Handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {

    // Stop the browser from reloading the page
    e.preventDefault();

    // Get the form element
    const form = e.currentTarget;

    // Collect all the values entered in the form
    const formData = new FormData(form);

    // Read each field individually
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const service = String(formData.get("service") ?? "");
    const budget = String(formData.get("budget") ?? "");
    const message = String(formData.get("message") ?? "");
    const website = String(formData.get("website") ?? "");


    // 10. Validate the form
    const newErrors: FormErrors = {};

    // Check the name
    if (name.trim().length < 2) {
      newErrors.name = "Please enter your name.";
    }

    // Check the email
    if (!isValidEmail(email.trim())) {
      newErrors.email = "Please enter a valid email.";
    }

    // Check whether a service was selected
    if (!service) {
      newErrors.service = "Choose a service.";
    }

    // Check the message
    if (message.trim().length < 10) {
      newErrors.message = "Tell us a little more (10+ characters).";
    }


    // Save all validation errors
    setErrors(newErrors);


    // If there are errors, stop the submission
    if (Object.keys(newErrors).length > 0) {

      // Focus the first field that contains an error
      if (newErrors.name) {
        document.getElementById("name")?.focus();
      }
      else if (newErrors.email) {
        document.getElementById("email")?.focus();
      }
      else if (newErrors.service) {
        document.getElementById("service")?.focus();
      }
      else if (newErrors.message) {
        document.getElementById("message")?.focus();
      }

      return;
    }


    // 11. Change the form state to loading
    setState("loading");


    // 12. Send the form information to the backend
      try {
  const responseData = await submitContact({
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    service,
    budget,
    message: message.trim(),
    website,
  });

  if (responseData.demo) {
    setState("demo");
  } else {
    setState("done");
  }

} catch (error) {
  console.error("Contact form error:", error);
  setState("fail");
}
    //   try {

  //     // Send a POST request to the contact API
  //     const response = await fetch("/api/contact", {

  //       method: "POST",

  //       headers: {
  //         "Content-Type": "application/json"
  //       },

  //       // Convert our form information into JSON
  //       body: JSON.stringify({
  //         name: name.trim(),
  //         email: email.trim(),
  //         company: company.trim(),
  //         service,
  //         budget,
  //         message: message.trim(),
  //         website
  //       })

  //     });


  //     // Read the response sent by the server
  //     const responseData = await response.json();


  //     // 13. Handle server-side validation errors
  //     if (response.status === 422 && responseData.errors) {

  //       setErrors(responseData.errors);

  //       setState("idle");

  //       return;
  //     }


  //     // 14. Check whether the request was successful
  //     if (!response.ok || !responseData.ok) {
  //       throw new Error("Something went wrong.");
  //     }


  //     // 15. Display the appropriate success state
  //     if (responseData.demo) {
  //       setState("demo");
  //     }
  //     else {
  //       setState("done");
  //     }

  //   }

  //   // 16. Handle unexpected errors
  //   catch (error) {

  //     console.error("Contact form error:", error);

  //     setState("fail");
  //   }
  }


  // 17. Display the Contact page
  return (

    <SceneTransition id="contact" className="contact">

      {/* Decorative background effects */}
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="grid-lines" aria-hidden="true" />


      {/* Main contact page container */}
      <div
        className="wrap contact__grid"
        onPointerMove={handleGlow}
      >


        {/* 18. LEFT SIDE: Contact information */}
        <div className="contact__lead">

          <h2 className="display">
            Let&apos;s build something{" "}
            <span className="it">remarkable.</span>
          </h2>

          <p className="lead">
            Have an ambitious idea? Let’s turn it into something people remember.
          </p>


          {/* Email */}
          <div className="cinfos">

            <Info
              label="Email"
              value={site.email}
              href={
                site.email
                  ? `mailto:${site.email}`
                  : undefined
              }
            />


            {/* Phone */}
            <Info
              label="Phone"
              value={site.phone}
              href={
                site.phone
                  ? `tel:${site.phone}`
                  : undefined
              }
            />


            {/* Location */}
            <Info
              label="Location"
              value={site.location}
            />


            {/* Social media links */}
            <div className="cinfo">
              <span>Social</span>

              <div className="socials">
                <SocialLinks />
                   </div>
                </div>
            </div>
            </div>


        {/* 19. RIGHT SIDE: Contact form */}
        <form
          className="form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={state === "loading"}
        >


          {/* 20. SUCCESS AND DEMO MESSAGES */}

          {state === "done" || state === "demo" ? (

            <div className="form__done" role="status">

              <h3>
                {state === "demo"
                  ? "Demo mode: message not sent."
                  : "Message sent."}
              </h3>

              <p>
                {state === "demo"
                  ? "Your details passed validation, but no email service is configured yet. Add the Resend keys from .env.example to send real messages."
                  : "Thank you. We'll get back to you soon."}
              </p>

              <button
                type="button"
                className="link"
                onClick={() => setState("idle")}
              >
                Send another
              </button>

            </div>

          ) : (


            /* 21. ACTUAL FORM FIELDS */

            <>

              {/* Name and Email */}
              <div className="form__row">


                {/* NAME FIELD */}
                <div className={`field ${errors.name ? "has-err" : ""}`}>

                  <label htmlFor="name">
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
                  />

                  {errors.name && (
                    <small id="name-error" role="alert">
                      {errors.name}
                    </small>
                  )}

                </div>


                {/* EMAIL FIELD */}
                <div className={`field ${errors.email ? "has-err" : ""}`}>

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                  />

                  {errors.email && (
                    <small id="email-error" role="alert">
                      {errors.email}
                    </small>
                  )}

                </div>

              </div>


              {/* COMPANY FIELD */}
              <div className="field">

                <label htmlFor="company">
                  Company / brand
                </label>

                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                />

              </div>


              {/* HONEYPOT SPAM PROTECTION */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hp"
                aria-hidden="true"
              />


              {/* SERVICE AND BUDGET */}
              <div className="form__row">


                {/* SERVICE DROPDOWN */}
                <div className={`field ${errors.service ? "has-err" : ""}`}>

                  <label htmlFor="service">
                    Service interested in
                  </label>

                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                  >

                    <option value="" disabled>
                      Select…
                    </option>

                    {/* Generate options from services.ts */}
                    {services.map((service) => (
                      <option
                        key={service.id}
                        value={service.title}
                      >
                        {service.title}
                      </option>
                    ))}

                    <option value="Not sure yet">
                      Not sure yet
                    </option>

                  </select>

                  {errors.service && (
                    <small id="service-error" role="alert">
                      {errors.service}
                    </small>
                  )}

                </div>


                {/* BUDGET DROPDOWN */}
                <div className="field">

                  <label htmlFor="budget">
                    Estimated budget <em>(optional)</em>
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                  >

                    <option value="">
                      Prefer not to say
                    </option>

                    {/* Generate options from budgets array */}
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}

                  </select>

                </div>

              </div>


              {/* MESSAGE FIELD */}
              <div className={`field ${errors.message ? "has-err" : ""}`}>

                <label htmlFor="message">
                  Tell us about the project
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />

                {errors.message && (
                  <small id="message-error" role="alert">
                    {errors.message}
                  </small>
                )}

              </div>


              {/* GENERAL SUBMISSION ERROR */}
              {state === "fail" && (
                <p className="form__fail" role="alert">
                  Something went wrong sending that. Please try again.
                </p>
              )}


              {/* SUBMIT BUTTON */}
              <MagneticButton
                type="submit"
                className="btn--solid"
                disabled={state === "loading"}
              >

                {state === "loading"
                  ? "Sending…"
                  : "Send message"}

              </MagneticButton>

            </>

          )}

        </form>

      </div>
   
   
  </SceneTransition>

  );
}