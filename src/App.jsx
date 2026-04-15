import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Button from './components/common/Button';
import Input from './components/common/Input';
import Dashboard from './components/Dashboard/Dashboard';
import UserGateway from './components/UserGateway';
import CurrentYear from './components/CurrentYear';


function App() {
  return (
    <div>
      <div className="app">
        {/* This component for 1st task */}
        <Button />
        <Input />
        <Dashboard />
        <Navbar />
        <Footer />

        {/* This component for 2nd task */}
        <UserGateway />

        {/* This component for 3rd task */}
        <CurrentYear />

      </div>

    </div>
  );
}

export default App;
