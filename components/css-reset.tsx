"use client"

import { useEffect } from "react"

export function CSSReset() {
  useEffect(() => {
    // Force CSS to load by adding a class to body
    document.body.classList.add("css-loaded")

    // Add some basic styles if Tailwind fails to load
    const style = document.createElement("style")
    style.textContent = `
      .css-loaded {
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      .fallback-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
      
      .fallback-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .fallback-button {
        background: #059669;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      }
      
      .fallback-button:hover {
        background: #047857;
      }
      
      .fallback-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
      }
      
      .fallback-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }
      
      @media (max-width: 768px) {
        .fallback-container {
          padding: 0.5rem;
        }
        
        .fallback-card {
          padding: 1rem;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
