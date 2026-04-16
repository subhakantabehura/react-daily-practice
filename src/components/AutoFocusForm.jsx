import { useEffect, useRef } from "react";

export default function AutoFocusForm() {
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current.focus();
    // alert('auto focus triggered');
  }, []);

  return (
    <form>
      <input
        ref={firstInputRef}
        type="text"
        placeholder="First Name"
      />

      <input type="text" placeholder="Last Name" />

      <button type="submit">Submit</button>
    </form>
  );
}