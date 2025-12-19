import React, { useState, useEffect } from 'react';
import './News.css';
import { Link } from 'react-router-dom';

function News({ t, lang }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- RSS FEED URLs ---
  const ENGLISH_RSS = "https://news.google.com/rss/search?q=uttar+pradesh+farmer+agriculture&hl=en-IN&ceid=IN:en";
  const HINDI_RSS = "https://news.google.com/rss/search?q=उत्तर+प्रदेश+किसान+कृषि&hl=hi-IN&ceid=IN:hi";

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Start loading animation when language changes
      setError(false);
      
      try {
        // 1. Select URL based on current Language
        const targetRSS = lang === 'Hindi' ? HINDI_RSS : ENGLISH_RSS;
        
        // 2. Use rss2json to convert RSS to JSON (Bypasses CORS)
        const API_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetRSS)}`;

        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (data.status === 'ok') {
          setArticles(data.items);
        } else {
          throw new Error("Feed Failed");
        }
        setLoading(false);

      } catch (err) {
        console.error("News Fetch Error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchNews();
  }, [lang]); // ⚠️ This [lang] tells React to re-run this code when language changes

  // --- MOCK DATA (Fallback) ---
  const mockNews = [
    {
      title: lang === 'Hindi' ? "गेहूं के एमएसपी में 150 रुपये की बढ़ोतरी" : "MSP for Wheat Increased by ₹150",
      pubDate: "2024-12-18 10:00:00",
      link: "#",
      content: lang === 'Hindi' ? "सरकार ने रबी फसलों के लिए न्यूनतम समर्थन मूल्य बढ़ाने को मंजूरी दी..." : "Government approves increase in Minimum Support Price for Rabi crops..."
    },
    {
      title: lang === 'Hindi' ? "छोटे किसानों के लिए नई ड्रोन सब्सिडी योजना" : "New Drone Subsidy Scheme for Farmers",
      pubDate: "2024-12-17 14:30:00",
      link: "#",
      content: lang === 'Hindi' ? "ड्रोन खरीदने पर 50% सब्सिडी की घोषणा..." : "50% subsidy announced on agricultural drones..."
    }
  ];

  // If API fails, show Mock Data
  const newsToShow = error ? mockNews : articles;

  return (
    <div className="page-container">
      <div className="news-header">
        <Link to="/" className="back-btn">{t.back}</Link>
        <h1>📰 {t.newsTitle}</h1>
      </div>

      {loading && <div className="loading-msg">⏳ {t.loadingNews}</div>}
      
      {error && !loading && (
        <div style={{textAlign:'center', color:'#b91c1c', background:'#fee2e2', padding:'10px', borderRadius:'8px', marginBottom:'20px'}}>
          ⚠️ {t.newsError}
        </div>
      )}

      <div className="news-list">
        {!loading && newsToShow.map((item, index) => {
          // Clean up the date
          const date = new Date(item.pubDate).toLocaleDateString(lang === 'Hindi' ? 'hi-IN' : 'en-IN', {
             day: 'numeric', month: 'short', year: 'numeric'
          });

          // Clean up description
          const cleanDesc = item.description 
            ? item.description.replace(/<[^>]+>/g, '').substring(0, 150) + "..." 
            : item.content || (lang === 'Hindi' ? "पूरी खबर पढ़ने के लिए क्लिक करें।" : "Click to read full story.");

          return (
            <div key={index} className="news-card">
              <div className="news-content">
                <span className="news-date">📅 {t.published}: {date}</span>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-snippet">{cleanDesc}</p>
                
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-read"
                >
                  {t.readMore} ➜
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default News;