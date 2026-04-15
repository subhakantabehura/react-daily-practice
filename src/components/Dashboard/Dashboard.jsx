import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import StatusFooter from "./StatusFooter";

function Dashboard() {
    return (
        <div className="main">
            <Sidebar />
            <MainContent />
            <StatusFooter />
        </div>
    );
}

export default Dashboard;