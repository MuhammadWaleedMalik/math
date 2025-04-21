import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
// import { useAuth } from '../contexts/AuthContext';



const colors = {
  primary: "#3A86FF",
  secondary: "#1A1A2E",
  accent: "#FFBE0B",
  light: "#E6F1FF",
  dark: "#0A0A12",
  background: "#1A1A2E",
  text: "#FFFFFF",
  paragraph: "#CCCCCC",
  hrcolor: "#333344",
};

const website = {
  name: "SageMath",
  slogan: "Math and Path – Achieve at Last",
};



const Navbar = () => {
  
  const { t, i18n } = useTranslation();
  const isAuthenticated = localStorage.getItem('token') !== null;
  const logout = () => {  
    localStorage.removeItem('token');
    window.location.reload();
  };
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAIFeaturesOpen, setIsAIFeaturesOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const aiDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target )) {
        setIsAIFeaturesOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target )) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAIFeatures = () => setIsAIFeaturesOpen(!isAIFeaturesOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <nav 
    style={{backgroundColor: colors.background }}
    className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-red/90 backdrop-blur-md' : 'bg-red'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src={"/images/notionai.jpg"} alt="Logo Image" className="w-12 h-12 object-contain" />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[32px] font-mono italic font-bold "
                style={{ color: colors.primary }}
              >{website.name}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
       
            <NavLink to="/docs" style={{ color: colors.primary }} className="nav-link">
              {t('Documentation')}
            </NavLink>
            <NavLink to="/pricing" style={{ color: colors.primary }} className="nav-link">
              {t('pricing')}
            </NavLink>
            <NavLink to="/blog" style={{ color: colors.primary }} className="nav-link">
              {t('Blogs')}
            </NavLink>

            <NavLink to="/ai-features" style={{ color: colors.primary }} className="nav-link">
              {t('Explore ')}
            </NavLink>
          
          

         
         
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                style={{ color: colors.primary , hover: "blue"}}
                className="nav-link flex items-center" onClick={toggleLanguageMenu}>
                <FiGlobe className="mr-1" /> {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </button>

              {isLanguageMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[lightgray] text-[red] border border-[red] z-50">
  
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => changeLanguage(language.code)} className="w-full text-left block px-4 py-2 text-sm 
                    hover:bg-[red] hover:text-[white] ">
                      {language.nativeName} ({language.name})
                    </button>
                  ))}
                </div>
              )}
        
        
            </div>
      
      
      
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={logout} className="btn bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                {t('logout')}
              </button>
            ) : (
              <>

              {/* #CADCFC #00246B */}
                <Link to="/login"
                className="btn  hover:bg-[white] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.white , backgroundColor: colors.primary  }}
                
                  >
                  {t('login')}
                </Link>
                <Link to="/signup" 
                
                className="btn  hover:bg-[rgb(255,255,255)] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.white , backgroundColor: colors.primary  }}
           
                >
                
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
        </div>









        <div className="flex justify-end items-center">
  {/* Menu Button (Mobile Only) */}
  <button onClick={toggleMenu} className="text-3xl md:hidden" style={{ color: "red" }}>
    {isMenuOpen ? <FiX /> : <FiMenu />}
  </button>
</div>

{/* Mobile Menu Overlay */}
{isMenuOpen && (
  <div
    className="fixed inset-0 flex flex-col items-center justify-center space-y-6 text-xl z-50 w-screen h-screen"
    style={{ backgroundColor: colors.background, color: "red" }}
  >
    <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-3xl" style={{ color: "red" }}>
      <FiX />
    </button>

    {/* Navigation Links */}
    <NavLink to="/docs" onClick={() => setIsMenuOpen(false)} className="transition-colors p-3 rounded-lg text-blue-600 hover:bg-blue-800 hover:text-[white]">
      {t("Documentation")}
    </NavLink>
    <NavLink to="/pricing" onClick={() => setIsMenuOpen(false)} className="transition-colors p-3 rounded-lg text-blue-600 hover:bg-blue-800 hover:text-[white] ">
      {t("pricing")}
    </NavLink>
    <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className="transition-colors p-3 rounded-lg text-blue-600 hover:bg-blue-800 hover:text-[white] ">
      {t("blog")}
    </NavLink>
    <NavLink to="/ai-features" onClick={() => setIsMenuOpen(false)} className="transition-colors p-3 rounded-lg text-blue-600 hover:bg-blue-800  hover:text-[white] ">
      {t("Explore")}    </NavLink>

   
   
   
   
   
    {/* Language Dropdown */}
    <div className="relative " ref={langDropdownRef}>
      <button className="nav-link text-blue-600 hover:bg-blue-800 flex items-center transition-colors p-3 rounded-lg  hover:text-[white] " onClick={toggleLanguageMenu}>
        <FiGlobe className="mr-1" /> {languages.find((lang) => lang.code === i18n.language)?.name || "English"}
      </button>

      {isLanguageMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg border z-50"
            style={{ backgroundColor: colors.white, color: colors.secondary, borderColor: colors.secondary }}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="w-full text-left block px-4 py-2 text-sm transition-colors hover:text-red-800"
            >
              {language.nativeName} ({language.name})
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Authentication Buttons */}
    {isAuthenticated ? (
      <button
        onClick={() => {
          logout();
          setIsMenuOpen(false);
        }}
        className="btn px-4 py-2 rounded transition-colors"
        style={{ backgroundColor: "red", color: colors.text }}
      >
        {t("logout")}
      </button>
    ) : (
      <>
        <Link
          to="/login"
          className="btn px-4 py-2 rounded transition-colors"
          onClick={() => setIsMenuOpen(false)}
          style={{ backgroundColor: colors.background, color: colors.primary }}
        >
          {t("login")}
        </Link>
        <Link
          to="/signup"
          onClick={() => setIsMenuOpen(false)}
          className="btn px-4 py-2 rounded transition-colors"
          style={{ backgroundColor: colors.background, color: colors.primary }}
>
          {t("signup")}
        </Link>
      </>
    )}
  </div>
)}









    </nav>
  );
};

export default Navbar;





















