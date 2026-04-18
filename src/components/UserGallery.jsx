import React, { use, Suspense } from 'react';
import UserCard from './UserCard';

/**
 *  Fetch Function
 * Returns an object { data, error } instead of throwing.
 * This allows us to handle errors inside the component without an ErrorBoundary.
 */
const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      return { data: null, error: 'Could not fetch users. Please try again later.' };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'Network error occurred. Check your connection.' };
  }
};

// Initiate the promise
const usersPromise = fetchUsers();

const UserList = () => {
  // use() waits for the promise to resolve to our { data, error } object
  const { data, error } = use(usersPromise);

  // Handle the error state directly inside the component
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="card-grid">
      {data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

const UserGallery = () => {
  return (
    <div className="container">
      <h1 className="title">User Directory</h1>

      {/* Suspense is still used for the loading state */}
      <Suspense fallback={<div className="loading">Loading user profiles...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
};

export default UserGallery;
