import React, { useActionState, Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback, type Feedback } from "../actions/feedback";


type FormState = {
  success: boolean;
  message: string;
} | null;


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="submit-btn" id="submit-feedback-btn">
      {pending ? (
        <span className="loader">Submitting</span>
      ) : (
        "Submit Feedback"
      )}
    </button>
  );
}

type FeedbackFormProps = {
  onAddFeedback: (item: Feedback) => void;
};

export default function FeedbackForm({ onAddFeedback }: FeedbackFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * This hook manages form state linked to a Feedback server action.
   */
  const [formState, formAction] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      try {
        // Call the server action with the form data
        const newFeedback = await submitFeedback(formData);

        onAddFeedback(newFeedback);

        // Reset the native form controls so users don't accidentally resubmit.
        // (Works for textarea + radio buttons + the name input.)
        formRef.current?.reset();

        return { success: true, message: "Thank you for your feedback!" };
      } catch (err) {
        // Handle any errors that occur during the mock server call
        const message = err instanceof Error ? err.message : "Something went wrong";
        return { success: false, message };
      }
    },
    null, // Initial state
  );

  // `useActionState` owns `formState`. We keep a separate "visible" state so we can auto-hide it.
  const [visibleState, setVisibleState] = useState<FormState>(null);

  useEffect(() => {
    setVisibleState(formState);

    if (formState?.success) {
      const t = window.setTimeout(() => setVisibleState(null), 2200);
      return () => window.clearTimeout(t);
    }
  }, [formState]);

  return (
    <div className="feedback-card">
      <form ref={formRef} action={formAction} className="feedback-form">
        <h2 className="form-title">Share Your Experience</h2>

        {/* New Field: Submitter Name */}
        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>

        <div className="input-group">
          <label>Your Feedback</label>
          <textarea
            id="text"
            name="text"
            placeholder="Tell us more about your experience..."
            required
          />
        </div>


        <div className="rating-group">
          <label>How would you rate us?</label>
          <div className="stars">
            {[5, 4, 3, 2, 1].map((num) => (
              <Fragment key={num}>
                <input type="radio" name="rating" value={num} id={`star-${num}`} className="star-input" required />
                <label htmlFor={`star-${num}`} className="star-label">★</label>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Display feedback status messages (success or error) */}
        {visibleState?.message && (
          <p className={`message ${visibleState.success ? "success" : "error"}`}>
            {visibleState.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

