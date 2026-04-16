function UserProfile({ username, age, isAdmin = false }) {
  return (
    <div>
      <h2>{username}</h2>
      <p>Age: {age}</p>
      <p>Status: {isAdmin ? "Admin" : "User"}</p>
    </div>
  );
}

export default UserProfile;