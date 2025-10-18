// src/App.jsx
import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

// ===== Layout & Common Pages =====
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import AboutPage from "./pages/About/About";
import BoardPage from "./pages/About/Board";
import Ourteam from "./pages/About/Ourteam";
import Founder from "./pages/About/Founder";
import Who_we_are from "./pages/About/Who_we_are";

// ===== Main Feature Pages =====
import ProductsPage from "./pages/products/Products";
import ProductDetailPage from "./pages/products/productdetailpage";
import ServicesPage from "./pages/Services/Services";
import ServiceDetailPage from "./pages/Services/Servicedetail";
import SolutionsPage from "./pages/Sollutions/Sollutionpage";
import SolutionDetail from "./pages/Sollutions/Sollutindetail";

import CaseStudiesPage from "./pages/Resourses/Casestudy";
import CaseStudyDetail from "./pages/Resourses/CaseStudyDetail";
import Contact from "./pages/contact/Contact";
import News from "./pages/News";
import ServiceSectorPage from "./pages/Services/ServiceSectorPage";
import FAQ from "./pages/faq";
import Emer from "./pages/About/Emer";
import Events from "./pages/Resourses/Events";

// ===== Preloader Component =====
import Preloader from "./components/Preloader";

const App = () => {
  // === Preloader visibility ===
  const [isLoaded, setIsLoaded] = useState(false);

  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        // ====== Home & About ======
        { index: true, element: <Home /> },
        { path: "about", element: <AboutPage /> },
        { path: "board-of-directors", element: <BoardPage /> },
        { path: "our-journey", element: <Emer /> },
        { path: "our-team", element: <Ourteam /> },
        { path: "founder", element: <Founder /> },
        { path: "who-we-are", element: <Who_we_are /> },
        { path: "new-and-media", element: <News /> },
        { path: "faq", element: <FAQ /> },
        { path: "events", element: <Events /> },

        // ====== Main Pages ======
        { path: "contact", element: <Contact /> },

        // ====== Case Studies ======
        {
          path: "case-studies",
          children: [
            { index: true, element: <CaseStudiesPage /> },
            { path: ":slug", element: <CaseStudyDetail /> },
          ],
        },

        // ====== Products ======
        {
          path: "products",
          children: [
            { index: true, element: <ProductsPage /> },
            { path: ":category/:slug", element: <ProductDetailPage /> },
          ],
        },

        // ====== Services ======
        {
          path: "services",
          children: [
            { index: true, element: <ServicesPage /> },
            { path: ":category/:slug", element: <ServiceDetailPage /> },
            { path: ":sector", element: <ServiceSectorPage /> },
          ],
        },

        // ====== Solutions ======
        {
          path: "solutions",
          children: [
            { index: true, element: <SolutionsPage /> },
            { path: ":slug", element: <SolutionDetail /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      {/* Preloader Screen */}
      {!isLoaded && (
        <Preloader
          onComplete={() => setIsLoaded(true)}
          backgroundColor="#04060a" // dark backdrop
          curveFill="#07518a" // brand color
        />
      )}

      {/* Main App after preload */}
      {isLoaded && routes}
    </>
  );
};

export default App;
