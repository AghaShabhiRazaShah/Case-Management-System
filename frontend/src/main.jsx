import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// ✅ 1. AOS ki CSS import karein
import 'aos/dist/aos.css'; 
// ✅ 2. AOS ko import karein
import AOS from 'aos'; 

// ✅ 3. AOS ko initialize karein (Yeh line zaroori hai)
AOS.init({
  duration: 1000, // Animation kitni der tak chalegi (1000ms = 1 second)
  once: true,     // Animation sirf 1 baar chalegi jab user scroll karega
  easing: 'ease-out-cubic', // Smooth movement
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)