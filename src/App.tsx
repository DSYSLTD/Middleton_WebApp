import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Obituaries from './pages/Obituaries';
import ObituaryDetails from './pages/ObituaryDetails';
import SubmitObituary from './pages/SubmitObituary';
import PrePlanning from './pages/PrePlanning';
import Contact from './pages/Contact';
import GriefSupport from './pages/GriefSupport';
import AboutUs from './pages/AboutUs';
import TeamMember from './pages/TeamMember';
import Burials from './pages/Burials';
import Cremation from './pages/Cremation';
import FuneralServices from './pages/FuneralServices';
import SpecializedServices from './pages/SpecializedServices';
import EmbalmingPreparation from './pages/EmbalmingPreparation';
import TransportationLivery from './pages/TransportationLivery';
import FuneralCoordination from './pages/FuneralCoordination';
import TechnologyMedia from './pages/TechnologyMedia';
import LegalAssistance from './pages/LegalAssistance';
import Venues from './pages/Venues';
import Prices from './pages/Prices';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Flowers from './pages/Flowers';
import SellWithUs from './pages/SellWithUs';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RegulatoryDisclosure from './pages/RegulatoryDisclosure';
import HowWeWork from './pages/HowWeWork';
import BookAppointment from './pages/BookAppointment';
import JoinSupportGroup from './pages/JoinSupportGroup';
import BurialComparison from './pages/BurialComparison';
import FAQ from './pages/FAQ';
import Resources from './pages/Resources';

import ScrollToTop from './components/ScrollToTop';
import CustomOrder from './pages/CustomOrder';
import LegalHeritagePlanning from './pages/LegalHeritagePlanning';
import CmsDashboard from './pages/CmsDashboard';
import Careers from './pages/Careers';
import { getActiveSubdomain, SubdomainType } from './utils/subdomain';

// Migrate any legacy hash routes to clean URLs
if (typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  const cleanPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', cleanPath);
}

function IndexRoute() {
  const [subdomain, setSubdomain] = useState<SubdomainType>(() => getActiveSubdomain());

  useEffect(() => {
    const handleSubdomainChange = () => {
      setSubdomain(getActiveSubdomain());
    };
    window.addEventListener('hashchange', handleSubdomainChange);
    window.addEventListener('popstate', handleSubdomainChange);
    return () => {
      window.removeEventListener('hashchange', handleSubdomainChange);
      window.removeEventListener('popstate', handleSubdomainChange);
    };
  }, []);

  if (subdomain === 'sympathygifts') {
    return <Flowers />;
  }
  if (subdomain === 'memorialessentials') {
    return <Shop />;
  }
  if (subdomain === 'blog') {
    return <Blog />;
  }
  return <Home />;
}

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexRoute />} />
              <Route path="how-we-work" element={<HowWeWork />} />
              <Route path="book-appointment" element={<BookAppointment />} />
              <Route path="services" element={<Services />} />
              <Route path="services/burials" element={<Burials />} />
              <Route path="burial-comparison" element={<BurialComparison />} />
              <Route path="services/cremation" element={<Cremation />} />
              <Route path="services/funeral-services" element={<FuneralServices />} />
              <Route path="services/specialized-services" element={<SpecializedServices />} />
              <Route path="services/embalming-preparation" element={<EmbalmingPreparation />} />
              <Route path="services/transportation-livery" element={<TransportationLivery />} />
              <Route path="services/funeral-coordination" element={<FuneralCoordination />} />
              <Route path="services/technology-media" element={<TechnologyMedia />} />
              <Route path="services/legal-assistance" element={<LegalAssistance />} />
              <Route path="services/legal-heritage-planning" element={<LegalHeritagePlanning />} />
              <Route path="legal-heritage-planning" element={<LegalHeritagePlanning />} />
              <Route path="services/venues" element={<Venues />} />
              <Route path="obituaries" element={<Obituaries />} />
              <Route path="obituaries/:id" element={<ObituaryDetails />} />
              <Route path="submit-obituary" element={<SubmitObituary />} />
              <Route path="pre-planning" element={<PrePlanning />} />
              <Route path="grief-support" element={<GriefSupport />} />
              <Route path="join-support-group" element={<JoinSupportGroup />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="team/:id" element={<TeamMember />} />
              <Route path="prices" element={<Prices />} />
              <Route path="products" element={<Products />} />
              <Route path="blog" element={<Blog />} />
              <Route path="shop" element={<Shop />} />
              <Route path="memorial-essentials" element={<Shop />} />
              <Route path="flowers" element={<Flowers />} />
              <Route path="sympathy-gifts" element={<Flowers />} />
              <Route path="custom-order" element={<CustomOrder />} />
              <Route path="sell-with-us" element={<SellWithUs />} />
              <Route path="login" element={<Login />} />
              <Route path="cms" element={<CmsDashboard />} />
              <Route path="dashboard" element={<CmsDashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="resources" element={<Resources />} />
              <Route path="careers" element={<Careers />} />
              <Route path="terms" element={<TermsAndConditions />} />
              <Route path="regulatory-disclosure" element={<RegulatoryDisclosure />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}
