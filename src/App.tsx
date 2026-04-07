/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import SobreMi from './pages/SobreMi';
import Talleres from './pages/Talleres';
import Mentoria from './pages/Mentoria';
import Testimonios from './pages/Testimonios';
import Prensa from './pages/Prensa';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/talleres" element={<Talleres />} />
          <Route path="/mentoria" element={<Mentoria />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/prensa" element={<Prensa />} />
        </Routes>
      </Layout>
    </Router>
  );
}
