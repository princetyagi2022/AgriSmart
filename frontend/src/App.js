// File: src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import './App.css';

// IMPORTING PAGES FROM THE NEW FOLDER
import Home from './pages/Home';
import CropAdvisory from './pages/CropAdvisory';
import Weather from './pages/Weather';
import MarketPrices from './pages/MarketPrices';
import GovSchemes from './pages/GovSchemes';
import PestDetection from './pages/PestDetection';
import SoilHealth from './pages/SoilHealth';
import News from './pages/News';
import SugarMill from './pages/SugarMill';

// REPLACE the 'translations' object in src/App.js with this:

const translations = {
  English: {
    appTitle: "🌱 AgriSmart",
    home: "Home",
    weather: "Weather",
    advisory: "Crop Advisory",
    soil: "Soil Health",
    pest: "Pest Detection",
    market: "Mandi Prices",
    tools: "Smart Tools",
    schemes: "Gov Schemes",
    back: "← Back",
    welcomeSub: "What do you want to do today?",
    
    // --- NEW ADDITIONS ---
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    farmer: "Farmer",
    alertTitle: "Alert",
    taskTitle: "Task",
    alertMsg: "Heavy rain expected tomorrow. Cover crops.",
    taskMsg: "Apply Urea in Wheat field today.",
    scan: "Scan Crop",
    expert: "Ask Expert",
    calc: "Calculator",
    news: "News",
    nextTask: "Next Task",
    irrigation: "Irrigation (Wheat)",
    rainLikely: "Rain likely @ 4PM",
    lastTest: "Last test",
    monthsAgo: "3 months ago",
    noOutbreaks: "No outbreaks nearby",
    nextPay: "Next Installment",
    dec25: "Dec 25",

    // --- CROP ADVISORY KEYS ---
    guidance: "Complete guidance for the",
    rabi: "Rabi Season",
    viewSchedule: "View Full Schedule",
    
    // Wheat Data
    wheat: "Wheat",
    majorCrop: "Major Crop",
    sowingLabel: "Sowing",
    fertLabel: "Fertilizer",
    waterLabel: "Irrigation",
    
    wheatSowing: "Nov 01 - Nov 15",
    wheatFert: "50kg DAP + 20kg Urea / Acre",
    wheatWater: "First water after 21 days (CRI Stage)",

    // Mustard Data
    mustard: "Mustard",
    oilseed: "Oilseed",
    mustardSowing: "Oct 15 - Oct 30",
    mustardFert: "Sulphur is critical for oil content.",
    mustardWater: "Pre-flowering & Pod formation.",

    // --- SCHEMES PAGE KEYS ---
    schemesTitle: "Government Schemes",
    searchSchemes: "Search Schemes...",
    schemeName: "Scheme Name",
    ministry: "Ministry / Department",
    benefits: "Benefits & Details",
    viewMore: "View Details",
    applyNow: "Apply Now",
    loadingSchemes: "Loading Government Schemes...",
    errorSchemes: "Using offline database (API limit reached).",

    // --- WEATHER PAGE KEYS ---
    wind: "Wind",
    humidity: "Humidity",
    visibility: "Visibility",
    uv: "UV Index",
    
    tipTitle: "Farming Tip for Today",
    tipMsg: "High humidity detected. Monitor crops for fungal infections.",
    
    rainAlertTitle: "Heavy Rain Alert",
    rainAlertMsg: "Expected in next 24 hours. Please cover harvested crops.",
    
    hourlyHeader: "Hourly Forecast",
    weeklyHeader: "5-Day Forecast",
    
    today: "Today",
    rain: "Rain",
    cloudy: "Cloudy",
    sunny: "Sunny",
    partial: "Partial Cloud",

    // --- MARKET PAGE KEYS ---
    marketTitle: "Mandi Prices (Live)",
    selectState: "Select State",
    selectCommodity: "Select Crop",
    search: "Search",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    modalPrice: "Avg Price",
    arrivalDate: "Date",
    loading: "Loading live prices...",
    errorMsg: "Could not fetch live data. Showing offline data.",
    // --- PEST DETECTION KEYS ---
    pestTitle: "Pest & Disease Detection",
    tapToScan: "Tap to Scan Plant",
    scanning: "Analyzing...",
    detected: "Pest Detected",
    severity: "Severity",
    remedy: "Recommended Solution",
    medicine: "Medicine Name",
    dosage: "Dosage",
    whenToUse: "Best Time to Spray",
    high: "High",
    moderate: "Moderate",
    buyNow: "Find Shop Nearby",
    scanAgain: "Scan Another Plant",

    // --- SOIL HEALTH KEYS ---
    soilTitle: "Soil Health Card",
    lastTested: "Last Tested",
    status: "Status",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    sulfur: "Sulfur (S)",
    low: "Low",
    ideal: "Ideal",
    high: "High",
    
    calcTitle: "Fertilizer Calculator",
    enterLand: "Enter Land Size (Acres)",
    calculate: "Calculate Dose",
    recommendation: "Recommended Dosage",
    urea: "Urea",
    dap: "DAP",
    mop: "MOP",
    bags: "Bags",
    bookTest: "Book Soil Test",
    // --- NEWS KEYS ---
    newsTitle: "Agriculture News",
    readMore: "Read Full Story",
    published: "Published on",
    loadingNews: "Loading latest headlines...",
    newsError: "Could not load live news. Showing trending topics.",


    // --- SUGAR MILL KEYS ---
    sugarTitle: "Sugar Mill (Cane)",
    checkParchi: "Check Parchi Status",
    growerCode: "Grower Code",
    villageCode: "Village Code",
    login: "View Data",
    parchiCalendar: "Parchi Calendar",
    supplyTickets: "Supply Tickets",
    weight: "Weight",
    date: "Date",
    millStatus: "Mill Status: Running 🟢",
    nextParchi: "Next Parchi: 24 Dec"

  },
  Hindi: {
    appTitle: "🌱 एग्री-स्मार्ट",
    home: "होम",
    weather: "मौसम",
    advisory: "फसल सलाह",
    soil: "मृदा स्वास्थ्य",
    pest: "कीट पहचान",
    market: "मंडी भाव",
    tools: "यंत्र",
    schemes: "योजनाएं",
    back: "← पीछे",
    welcomeSub: "आज आप क्या करना चाहते हैं?",

    // --- NEW ADDITIONS (HINDI) ---
    goodMorning: "शुभ प्रभात",
    goodAfternoon: "शुभ दोपहर",
    goodEvening: "शुभ संध्या",
    farmer: "किसान",
    alertTitle: "चेतावनी",
    taskTitle: "कार्य",
    alertMsg: "कल भारी बारिश की संभावना है। फसलों को ढक दें।",
    taskMsg: "आज गेहूं के खेत में यूरिया डालें।",
    scan: "फसल स्कैन",
    expert: "विशेषज्ञ सलाह",
    calc: "कैलकुलेटर",
    news: "समाचार",
    nextTask: "अगला कार्य",
    irrigation: "सिंचाई (गेहूं)",
    rainLikely: "शाम 4 बजे बारिश की संभावना",
    lastTest: "पिछली जांच",
    monthsAgo: "3 महीने पहले",
    noOutbreaks: "आसपास कोई बीमारी नहीं",
    nextPay: "अगली किस्त",
    dec25: "25 दिसंबर",

    // --- CROP ADVISORY KEYS (HINDI) ---
    guidance: "के लिए पूर्ण मार्गदर्शन",
    rabi: "रबी मौसम",
    viewSchedule: "पूरी समयसारिणी देखें",
    
    // Wheat Data
    wheat: "गेहूं",
    majorCrop: "मुख्य फसल",
    sowingLabel: "बुवाई",
    fertLabel: "खाद",
    waterLabel: "सिंचाई",
    
    wheatSowing: "1 नवंबर - 15 नवंबर",
    wheatFert: "50 किग्रा डीएपी + 20 किग्रा यूरिया / एकड़",
    wheatWater: "21 दिनों बाद पहला पानी (CRI अवस्था)",

    // Mustard Data
    mustard: "सरसों",
    oilseed: "तिलहन",
    mustardSowing: "15 अक्टूबर - 30 अक्टूबर",
    mustardFert: "तेल की मात्रा के लिए सल्फर आवश्यक है।",
    mustardWater: "फूल आने से पहले और फलियाँ बनते समय।",

    // --- WEATHER PAGE KEYS (HINDI) ---
    wind: "हवा",
    humidity: "नमी",
    visibility: "दृश्यता",
    uv: "यूवी इंडेक्स",
    
    tipTitle: "आज के लिए खेती की सलाह",
    tipMsg: "अधिक नमी का पता चला है। फसलों को फंगल संक्रमण से बचाएं।",
    
    rainAlertTitle: "भारी बारिश की चेतावनी",
    rainAlertMsg: "अगले 24 घंटों में बारिश की संभावना। कटी हुई फसलों को ढक दें।",
    
    hourlyHeader: "प्रति घंटा मौसम",
    weeklyHeader: "5 दिनों का पूर्वानुमान",
    
    today: "आज",
    rain: "बारिश",
    cloudy: "बादल",
    sunny: "धूप",
    partial: "आंशिक बादल",

    // --- MARKET PAGE KEYS (HINDI) ---
    marketTitle: "मंडी भाव (ताज़ा)",
    selectState: "राज्य चुनें",
    selectCommodity: "फसल चुनें",
    search: "खोजें",
    minPrice: "न्यूनतम भाव",
    maxPrice: "अधिकतम भाव",
    modalPrice: "औसत भाव",
    arrivalDate: "दिनांक",
    loading: "भाव लोड हो रहे हैं...",
    errorMsg: "लाइव डेटा नहीं मिला। ऑफलाइन डेटा दिखाया जा रहा है।",


    // --- SCHEMES PAGE KEYS (HINDI) ---
    schemesTitle: "सरकारी योजनाएं",
    searchSchemes: "योजनाएं खोजें...",
    schemeName: "योजना का नाम",
    ministry: "मंत्रालय / विभाग",
    benefits: "लाभ और विवरण",
    viewMore: "विवरण देखें",
    applyNow: "आवेदन करें",
    loadingSchemes: "योजनाएं लोड हो रही हैं...",
    errorSchemes: "ऑफलाइन डेटा का उपयोग किया जा रहा है।",

    // --- PEST DETECTION KEYS (HINDI) ---
    pestTitle: "कीट और रोग पहचान",
    tapToScan: "स्कैन करने के लिए टैप करें",
    scanning: "जांच जारी है...",
    detected: "कीट पाया गया",
    severity: "गंभीरता",
    remedy: "सुझाया गया उपाय",
    medicine: "दवा का नाम",
    dosage: "मात्रा (Dosage)",
    whenToUse: "छिड़काव का सही समय",
    high: "अधिक",
    moderate: "मध्यम",
    buyNow: "नज़दीकी दुकान खोजें",
    scanAgain: "दूसरा पौधा स्कैन करें",


    // --- SOIL HEALTH KEYS (HINDI) ---
    soilTitle: "मृदा स्वास्थ्य कार्ड",
    lastTested: "पिछली जांच",
    status: "स्थिति",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फॉस्फोरस (P)",
    potassium: "पोटाश (K)",
    sulfur: "सल्फर (S)",
    low: "कम",
    ideal: "उचित",
    high: "अधिक",
    
    calcTitle: "खाद कैलकुलेटर",
    enterLand: "जमीन का आकार (एकड़)",
    calculate: "गणना करें",
    recommendation: "सुझाई गई मात्रा",
    urea: "यूरिया",
    dap: "डीएपी (DAP)",
    mop: "एमओपी (MOP)",
    bags: "बैग",
    bookTest: "मृदा परीक्षण बुक करें",
    // --- NEWS KEYS (HINDI) ---
    newsTitle: "कृषि समाचार",
    readMore: "पूरी खबर पढ़ें",
    published: "प्रकाशित",
    loadingNews: "ताज़ा खबरें लोड हो रही हैं...",
    newsError: "लाइव समाचार लोड नहीं हो सके। ट्रेंडिंग विषय दिखाए जा रहे हैं।",


    // --- SUGAR MILL KEYS (HINDI) ---
    sugarTitle: "चीनी मिल (गन्ना)",
    checkParchi: "पर्ची की स्थिति देखें",
    growerCode: "किसान कोड",
    villageCode: "गाँव कोड",
    login: "विवरण देखें",
    parchiCalendar: "पर्ची कैलेंडर",
    supplyTickets: "आपूर्ति पर्ची",
    weight: "वजन (क्विंटल)",
    date: "दिनांक",
    millStatus: "मिल स्थिति: चालू है 🟢",
    nextParchi: "अगली पर्ची: 24 दिसंबर"
  }
};
function App() {
  const [language, setLanguage] = useState('English');
  const t = translations[language]; 

  const toggleLang = () => setLanguage(language === 'English' ? 'Hindi' : 'English');

  return (
    <Router>
      <div className="app-container">
        
        {/* Header */}
        <header className="header">
          <div className="logo">{t.appTitle}</div>
          <button onClick={toggleLang} className="lang-btn">
            {language === 'English' ? '🇮🇳 Hindi' : '🇬🇧 English'}
          </button>
        </header>

        {/* Routes */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/advisory" element={<CropAdvisory t={t} />} />
            <Route path="/weather" element={<Weather t={t} />} />
            <Route path="/market" element={<MarketPrices t={t} />} />
            <Route path="/schemes" element={<GovSchemes t={t} />} />
            <Route path="/pest" element={<PestDetection t={t} />} />
            <Route path="/soil" element={<SoilHealth t={t} />} />
           <Route path="/news" element={<News t={t} lang={language} />} />
           <Route path="/sugarmill" element={<SugarMill t={t} />} />
          </Routes>
        </div>

        {/* Bottom Navigation */}
        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <NavLink to="/" className="nav-item" end>
            <span>🏠</span> {t.home}
          </NavLink>
          
          <NavLink to="/advisory" className="nav-item">
            <span>🌾</span> {t.advisory}
          </NavLink>
          
          <NavLink to="/weather" className="nav-item">
            <span>🌦️</span> {t.weather}
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;