import React, { useState, useEffect, useCallback } from "react";
import "./MarketPrices.css";
import { Link } from "react-router-dom";

function MarketPrices({ t }) {
  // State for storing data
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [state, setState] = useState("Punjab");
  const [commodity, setCommodity] = useState("Wheat");

  // --- MOCK DATA (Fallback) ---
  const getMockData = () => {
    return [
      {
        market: "Azadpur",
        state: "Delhi",
        commodity: "Wheat",
        min_price: "2100",
        max_price: "2300",
        modal_price: "2250",
        arrival_date: "19/12/2025",
      },
      {
        market: "Khanna",
        state: "Punjab",
        commodity: "Wheat",
        min_price: "2150",
        max_price: "2200",
        modal_price: "2180",
        arrival_date: "19/12/2025",
      },
      {
        market: "Kota",
        state: "Rajasthan",
        commodity: "Wheat",
        min_price: "2050",
        max_price: "2250",
        modal_price: "2100",
        arrival_date: "19/12/2025",
      },
      {
        market: "Indore",
        state: "MP",
        commodity: "Wheat",
        min_price: "2200",
        max_price: "2400",
        modal_price: "2350",
        arrival_date: "19/12/2025",
      },
    ];
  };

  // --- 1. REAL API FUNCTION (Wrapped in useCallback to fix warning) ---
  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError("");

    // ⚠️ REPLACE THIS WITH YOUR OWN KEY FROM data.gov.in
    const API_KEY = "579b464db66ec23bdd000001424c4c823c1340f6511fe5e40830b214";
    const URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${state}&filters[commodity]=${commodity}`;

    try {
      // Note: This fetch will likely fail without a real key, triggering the catch block below
      const response = await fetch(URL);
      const data = await response.json();

      if (data.records && data.records.length > 0) {
        setPrices(data.records);
      } else {
        throw new Error("No data found");
      }
    } catch (err) {
      console.log("API Failed, using Fallback Data");
      // Now we are actually using the 'error' state!
      setError(t.errorMsg);
      setPrices(getMockData());
    }
    setLoading(false);
  }, [state, commodity, t.errorMsg]); // Dependencies: Re-create function only if these change

  // Load data on first open OR when fetchPrices changes
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">
        {t.back}
      </Link>
      <h1>💰 {t.marketTitle}</h1>

      {/* Filter Section */}
      <div className="filters-container">
        <div className="filter-group">
          <label>{t.selectState}</label>
          <select
            className="custom-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
        </div>

        <div className="filter-group">
          <label>{t.selectCommodity}</label>
          <select
            className="custom-select"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
            {/* Cereals & Grains */}
            <option value="Wheat">Wheat (गेहूं)</option>
            <option value="Rice">Rice (चावल)</option>
            <option value="Maize">Maize (मक्का)</option>
            <option value="Barley">Barley (जौ)</option>
            <option value="Bajra">Pearl Millet (बाजरा)</option>

            {/* Vegetables */}
            <option value="Potato">Potato (आलू)</option>
            <option value="Onion">Onion (प्याज़)</option>
            <option value="Tomato">Tomato (टमाटर)</option>
            <option value="Cauliflower">Cauliflower (फूलगोभी)</option>
            <option value="Brinjal">Brinjal (बैंगन)</option>
            <option value="Garlic">Garlic (लहसुन)</option>
            <option value="Ginger">Ginger (अदरक)</option>

            {/* Pulses (Dal) */}
            <option value="Gram">Bengal Gram (चना)</option>
            <option value="Arhar">Arhar/Tur (अरहर/तूर)</option>
            <option value="Moong">Green Gram (मूंग)</option>
            <option value="Masur">Lentil (मसूर)</option>

            {/* Cash Crops & Spices */}
            <option value="Cotton">Cotton (कपास)</option>
            <option value="Sugarcane">Sugarcane (गन्ना)</option>
            <option value="Mustard">Mustard (सरसों)</option>
            <option value="Soybean">Soybean (सोयाबीन)</option>
            <option value="Groundnut">Groundnut (मूंगफली)</option>
            <option value="Turmeric">Turmeric (हल्दी)</option>
            <option value="Jeera">Cumin (जीरा)</option>

            {/* Fruits */}
            <option value="Banana">Banana (केला)</option>
            <option value="Mango">Mango (आम)</option>
            <option value="Apple">Apple (सेब)</option>
          </select>
        </div>

        <button className="search-btn" onClick={fetchPrices}>
          {t.search}
        </button>
      </div>

      {/* Loading & Error Display */}
      {loading && <div className="loading-spinner">⏳ {t.loading}</div>}

      {/* 🔴 NEW: This fixes the 'error unused' warning by displaying it */}
      {error && (
        <div
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Price List */}
      <div className="price-list">
        {prices.map((item, index) => (
          <div key={index} className="price-card">
            <div className="price-header">
              <h3>{item.market}</h3>
              <span className="market-badge">{item.state}</span>
            </div>

            <div className="price-details">
              <div className="price-box">
                <span>{t.minPrice}</span>
                <strong>₹{item.min_price}</strong>
              </div>
              <div className="price-box modal-box">
                <span>{t.modalPrice}</span>
                <strong>₹{item.modal_price}</strong>
              </div>
              <div className="price-box">
                <span>{t.maxPrice}</span>
                <strong>₹{item.max_price}</strong>
              </div>
            </div>

            <p className="date-tag">
              📅 {t.arrivalDate}: {item.arrival_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPrices;
