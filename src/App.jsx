import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blogs from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';

import Privacy from   './pages/Privacy';

import PricingBasic from './pages/PricingBasic';
import PricingEnterprice from './pages/PricingEnterprice';
import PricingPro from './pages/PricingPro';


import DashboardC from './pages/DashboardC';



import ProtectedRoute from './components/ProtectedRoute';
import AIFeatures from './pages/AIFeatures';


import Docs from './pages/Docs';
import AlgebraSolver from './pages/features/Algebra';
import NumericalMaths from './pages/features/Numerical';
import StatsProbability from './pages/features/Stats';
import LinearAlgebra from './pages/features/linear';
import Plotter from './pages/features/Plotting';
import SymbolicComputations from './pages/features/Symbol';















function App() {
  return (  
    <Routes>
      <Route path="/admin/*" element={<DashboardC />} />
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="docs" element={<Docs />} />
        <Route path="ai-features"  element={<AIFeatures/>} />
        


        
          
        



          
        <Route element={<ProtectedRoute />}>
          
          <Route path="/features/algebra-calculus" element={<AlgebraSolver />} />
          <Route path="/features/numerical-mathematics" element={<NumericalMaths />} />
          <Route path="/features/statistics" element={<StatsProbability />} />
          <Route path="/features/linear-algebra" element={<LinearAlgebra />} />
          <Route path="/features/plotting" element={<Plotter />} />
          <Route path="/features/symbolic-computation" element={<SymbolicComputations />} />
          <Route path="pricing/basic" element={<PricingBasic />} />
                              <Route path="pricing/enterprise" element={<PricingEnterprice />} />
                              <Route path="pricing/pro" element={<PricingPro />} />
     
        </Route>
          
          <Route path="pricing" element={<Pricing />} />
          


        
        
          
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />


        <Route path="privacy" element={<Privacy/>} /> 


        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;