import { StrictMode } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';

export const Root = () => (
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={<HomePage />} /> */}

          <Route path="home" element={<Navigate to="/" replace />} />

          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
