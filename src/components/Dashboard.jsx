import UserProfile from "./UserProfile";

function Dashboard() {
  return (
    <div className="app">
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "40px" }}>
        <UserProfile username="Subha" age={25} isAdmin={true} />
        <UserProfile username="Anil" age={28} isAdmin={false} />
        <UserProfile username="Ankit" age={22} />
      </div>
    </div>
  );
}

export default Dashboard;