import "./App.css";
import "./index.css";
import StatusCardComponent from './components/StatusCardComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLinkComponent from './components/NavLinkComponent';

function App() {
  return (
    <div>

      {/* Task3 Header */}
      <Header />

      {/* Task1  */}
      <div style={{ padding: '20px' }}>
        <button className="btn">Button</button>
      </div>

      {/* Task2 StatusCardComponent */}
      <div style={{ padding: '20px' }}>
        <StatusCardComponent type="success" message="Operation Successful!" />
        <StatusCardComponent type="error" message="Something went wrong!" />
      </div>

      {/* Task4 NavLinkComponent */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <NavLinkComponent href="#">Home</NavLinkComponent>
        <NavLinkComponent href="#">Services</NavLinkComponent>
        <NavLinkComponent href="#">Contact</NavLinkComponent>
      </nav>

      {/* Task3 Footer */}
      <Footer />

    </div >
  );
}

export default App;
