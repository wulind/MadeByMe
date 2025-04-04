import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import PurchasePage from './components/pages/PurchasePage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/purchase" Component={PurchasePage} />
        </Routes>
      </Router>
  );
}

export default App;
