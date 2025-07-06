import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply the theme class to the body
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-button-text)] font-medium hover:opacity-90 transition-all"
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button> */}

      <div className="relative w-full max-w-4xl">
        {/* Floating shapes */}
        <div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-50 mix-blend-multiply animate-float"
          style={{ backgroundColor: 'var(--color-shape-1)' }}
        ></div>
        <div 
          className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full opacity-50 mix-blend-multiply animate-float-delay"
          style={{ backgroundColor: 'var(--color-shape-2)' }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full opacity-50 mix-blend-multiply animate-float-delay-2"
          style={{ backgroundColor: 'var(--color-shape-3)' }}
        ></div>

        <div 
          className="relative rounded-3xl shadow-2xl overflow-hidden border backdrop-blur-sm mt-12"
          style={{ 
            backgroundColor: 'var(--color-card-bg)',
            borderColor: 'var(--color-border)'
          }}
        >
          {/* Colorful header */}
          <div 
            className="h-4"
            style={{ 
              background: `linear-gradient(to right, var(--color-primary-dark), var(--color-primary-light), var(--color-primary))`
            }}
          ></div>
          
          <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 
                className="text-8xl font-bold mb-4"
                style={{
                  background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                404
              </h1>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Oops! Page Not Found
              </h2>
              <p className="text-lg mb-8 max-w-md" style={{ color: 'var(--color-text-light)' }}>
                The page you're looking for doesn't exist or has been moved. Let's get you back on track!
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    background: 'var(--color-button-primary)',
                    color: 'var(--color-button-text)'
                  }}
                >
                  Go Back
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    background: 'var(--color-button-secondary)',
                    color: 'var(--color-button-text)'
                  }}
                >
                  Home Page
                </button>
              </div>
            </div>
            
            <div className="flex-1 mt-10 md:mt-0">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div 
                      className="w-48 h-48 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-shape-1)' }}
                    >
                      <div 
                        className="w-40 h-40 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-shape-2)' }}
                      >
                        <div 
                          className="w-32 h-32 rounded-full flex items-center justify-center shadow-inner"
                          style={{ 
                            background: `linear-gradient(to bottom right, var(--color-primary-light), var(--color-primary))`
                          }}
                        >
                          <span className="text-6xl font-bold" style={{ color: 'var(--color-button-text)' }}>404</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div 
                      className="absolute -top-6 -left-6 w-16 h-16 rounded-full opacity-80 animate-bounce"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    ></div>
                    <div 
                      className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full opacity-80 animate-bounce-delay"
                      style={{ backgroundColor: 'var(--color-secondary-light)' }}
                    ></div>
                    <div 
                      className="absolute top-4 -right-8 w-10 h-10 rounded-full opacity-80 animate-bounce-delay-2"
                      style={{ backgroundColor: 'var(--color-primary-light)' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;