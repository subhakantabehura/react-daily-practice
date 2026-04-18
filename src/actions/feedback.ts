// Define the structure of a Feedback object
export type Feedback = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

/** 
 * Simulates a server action:
 */
export async function submitFeedback(formData: FormData): Promise<Feedback> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Extract values using the 'name' attributes from the form inputs
  const name = formData.get("name");
  const rating = formData.get("rating");
  const text = formData.get("text");

  // Basic validation: ensure all fields are provided
  if (!name || !rating || !text) {
    throw new Error("Name, rating, and text are required");
  }

  // Return the newly "created" feedback item
  return {
    id: Math.random().toString(36).substring(2, 11), // Random unique ID
    name: name.toString(),
    rating: Number(rating),
    text: text.toString(),
  };
}
