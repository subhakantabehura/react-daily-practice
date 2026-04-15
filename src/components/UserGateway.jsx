import AdminPanel from './AdminPanel';

function UserGateway() {

    const user = {
        name: "Alex",
        role: "admin",
        status: "active",
    };

    if (user.status === "suspended") {
        return <div>
            <h2> Contact Support: Your account is suspended.</h2>
        </div>;
    }

    if (user.role === "admin") {
        return <AdminPanel />;
    }

    return (
        <div>
            <h2>Hello User, {user.name}!</h2>
        </div>
    );
}

export default UserGateway;