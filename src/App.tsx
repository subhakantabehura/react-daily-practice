import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import type { Feedback } from "./actions/feedback";
import "./index.css";


function App() {
  // State to store all feedback items. Initialized as an empty array.
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  /**
   * adds a new feedback item to the beginning of the list.
   * This is passed down to the FeedbackForm component.
   */
  const addFeedback = (newFeedback: Feedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>React class Feedback </h1>
      </header>

      <section className="feedback-section">

        {/* The form for submitting new feedback */}
        <FeedbackForm onAddFeedback={addFeedback} />

        {/* The list showing all previous submissions */}
        <FeedbackList feedbacks={feedbacks} />
      </section>
    </main>
  );
}

export default App;
