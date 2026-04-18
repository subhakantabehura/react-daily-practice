import type { Feedback } from "../actions/feedback";

type FeedbackListProps = {
  feedbacks: Feedback[]; // List of feedback items passed from the parent state
};

/**
 * FeedbackList Component:
 */
export default function FeedbackList({ feedbacks }: FeedbackListProps) {

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <p>No feedback yet.</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <h3>Recent Feedback ({feedbacks.length})</h3>
      <div className="feedback-grid">
        {feedbacks.map((item) => (
          <div key={item.id} className="feedback-item">
            <div className="feedback-header">
              <div className="item-rating">

                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`star ${i < item.rating ? "active" : ""}`}>
                    {"\u2605"}
                  </span>
                ))}
              </div>
              <span className="item-id">#{item.id}</span>
            </div>

            {/* Display the submitter's name and their comment */}
            <h4 className="item-name">{item.name}</h4>
            <p className="item-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
