import React, { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  // Refs for the animation
  const pipelineRef = useRef<HTMLDivElement>(null);
  const nodeStackRef = useRef<HTMLDivElement>(null);
  const nodeXRef = useRef<HTMLDivElement>(null);
  const nodeShieldRef = useRef<HTMLDivElement>(null);
  const beamPathGlowRef = useRef<SVGPathElement>(null);
  const beamPathCoreRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  // Animation logic
  useEffect(() => {
    let animationFrameId: number;
    let lastStateChange = performance.now();
    let currentState: 'p1' | 'splash' | 'p2' | 'idle' = 'p1';

    const updatePath = () => {
      if (!pipelineRef.current || !nodeStackRef.current || !nodeXRef.current || !nodeShieldRef.current || !beamPathGlowRef.current || !beamPathCoreRef.current) return;
      
      const pRect = pipelineRef.current.getBoundingClientRect();
      const sRect = nodeStackRef.current.getBoundingClientRect();
      const xRect = nodeXRef.current.getBoundingClientRect();
      const shRect = nodeShieldRef.current.getBoundingClientRect();
      
      const startX = sRect.left + sRect.width/2 - pRect.left;
      const startY = sRect.top  + sRect.height/2 - pRect.top;
      const midX = xRect.left + xRect.width/2 - pRect.left;
      const midY = xRect.top + xRect.height/2 - pRect.top;
      const endX = shRect.left + shRect.width/2 - pRect.left;
      const endY = shRect.top + shRect.height/2 - pRect.top;
      
      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
      beamPathGlowRef.current.setAttribute('d', d);
      beamPathCoreRef.current.setAttribute('d', d);
    };

    const animate = (time: number) => {
      const elapsed = time - lastStateChange;
      
      if (!gradientRef.current || !beamPathGlowRef.current || !beamPathCoreRef.current || !nodeStackRef.current || !nodeShieldRef.current || !splashRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const glowStyle = beamPathGlowRef.current.style;
      const coreStyle = beamPathCoreRef.current.style;
      const stackList = nodeStackRef.current.classList;
      const shieldList = nodeShieldRef.current.classList;
      const splashList = splashRef.current.classList;

      if (currentState === 'p1') {
        const duration = 800;
        let p = elapsed / duration;
        if (p > 1) p = 1;
        
        // p1 interpolates percentage from 0 to 0.5
        const percentage = p * 0.5;
        const center = percentage * 100;
        gradientRef.current.setAttribute('x1', `${center - 5}%`);
        gradientRef.current.setAttribute('x2', `${center + 5}%`);
        
        if (p < 0.4) stackList.add('active');
        else stackList.remove('active');
        
        if (p >= 1) {
          currentState = 'splash';
          lastStateChange = time;
          glowStyle.opacity = '0';
          coreStyle.opacity = '0';
          splashList.add('animate');
        }
      } 
      else if (currentState === 'splash') {
        const duration = 800;
        if (elapsed >= duration) {
          currentState = 'p2';
          lastStateChange = time;
          splashList.remove('animate');
          glowStyle.opacity = '0.6';
          coreStyle.opacity = '1';
        }
      }
      else if (currentState === 'p2') {
        const duration = 800;
        let p = elapsed / duration;
        if (p > 1) p = 1;
        
        // p2 interpolates percentage from 0.5 to 1.0
        const percentage = 0.5 + (p * 0.5);
        const center = percentage * 100;
        gradientRef.current.setAttribute('x1', `${center - 5}%`);
        gradientRef.current.setAttribute('x2', `${center + 5}%`);
        
        if (p > 0.6) shieldList.add('active');
        
        if (p >= 1) {
          currentState = 'idle';
          lastStateChange = time;
          shieldList.remove('active');
          glowStyle.opacity = '0'; // Hide at the end
          coreStyle.opacity = '0';
        }
      }
      else if (currentState === 'idle') {
        const duration = 1000;
        if (elapsed >= duration) {
          currentState = 'p1';
          lastStateChange = time;
          glowStyle.opacity = '0.6';
          coreStyle.opacity = '1';
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updatePath);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="xero-landing-page">
      
      {/* HERO CARD */}
      <section className="hero-card">
        <div className="hero-grid"></div>

        {/* ICON PIPELINE */}
        <div className="icon-pipeline" ref={pipelineRef}>
          <svg className="beam-svg">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" />
                <feComposite in="SourceGraphic" in2="blurOut" operator="over" />
              </filter>
              <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" ref={gradientRef} x1="0%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#b04090" stopOpacity="0" />
                <stop offset="20%" stopColor="#b04090" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                <stop offset="80%" stopColor="#c8a0e0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c8a0e0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path ref={beamPathGlowRef} stroke="url(#beam-gradient)" strokeWidth="2" filter="url(#glow)" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={beamPathCoreRef} stroke="url(#beam-gradient)" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div id="node-stack" className="icon-node node-light-right" ref={nodeStackRef}>
            <svg viewBox="0 0 24 24">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>

          <div className="pipeline-line"></div>

          <div className="center-wrapper">
            <div className="splash" ref={splashRef}></div>
            <div id="node-x" className="icon-node-center" ref={nodeXRef}>
              <svg viewBox="0 0 40 40">
                <path d="M12 12 L17.5 12 L28 28 L22.5 28 Z M28 12 L22.5 12 L12 28 L17.5 28 Z" fill="white" />
              </svg>
            </div>
          </div>

          <div className="pipeline-line right"></div>

          <div id="node-shield" className="icon-node node-light-left" ref={nodeShieldRef}>
            <svg viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="hero-content">
          <h1 className="hero-heading">
            The simple way
            <strong>encryption your data</strong>
          </h1>
          <p className="hero-sub">
            Fully managed data encrypting service and annotation<br />
            platform for teams of all industries.
          </p>
          <a href="#" className="btn-cta">Get Started</a>
        </div>
      </section>

      {/* BRANDS ROW */}
      <div className="brands">
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path fill="var(--bg)" d="M8 9h8v2H8zm0 4h6v2H8z" />
          </svg>
          Expedia
        </div>
        
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" fill="currentColor" />
            <circle cx="5" cy="16" r="3.5" fill="currentColor" />
            <circle cx="19" cy="16" r="3.5" fill="currentColor" />
          </svg>
          asana
        </div>
        
        <div className="brand-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 8 20 8" />
            <polyline points="8 12 16 12" />
            <polyline points="4 16 20 16" />
          </svg>
          zenefits
        </div>
        
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="15.5" cy="8.5" r="2.5" fill="currentColor" />
            <circle cx="8.5" cy="8.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 8.5 L13 8.5 M8.5 10.5 L8.5 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          HubSp<span className="hubspot-dot"></span>t
        </div>
        
        <div className="brand-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="3" x2="12" y2="21" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
            <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
          </svg>
          loom
        </div>
      </div>

    </div>
  );
}
