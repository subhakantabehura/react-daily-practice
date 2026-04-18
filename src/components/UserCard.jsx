import React from 'react';

/**
 * UserCard Component
 * Displays individual user information in a simple card format.
 * Receives 'user' object as a prop from the parent UserList.
 */
const UserCard = ({ user }) => {
  // Destructuring user properties for easier access
  const { name, email, phone, website, company } = user;

  // Generate initials for the avatar circle (e.g., "John Doe" -> "JD")
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="card">
      {/* Visual Avatar using initials */}
      <div className="card-avatar">
        {initials}
      </div>

      <div className="card-content">
        {/* Main User Name */}
        <h2 className="card-name">{name}</h2>
        
        {/* User Details Section */}
        <div className="card-details">
          <p><strong>Email:</strong> {email.toLowerCase()}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Website:</strong> {website}</p>
          <p><strong>Company:</strong> {company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
