import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        {/* All page transitions happen inside AppRoutes */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;