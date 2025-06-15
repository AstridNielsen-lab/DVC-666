import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
        this.pulseDirection = 1;
      }

      getRandomColor() {
        const colors = [
          'rgba(139, 0, 0, ',     // Dark red
          'rgba(255, 69, 0, ',    // Orange red
          'rgba(220, 20, 60, ',   // Crimson
          'rgba(255, 0, 0, ',     // Red
          'rgba(255, 255, 255, '  // White (rare)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Pulsing effect
        this.opacity += this.pulse * this.pulseDirection;
        if (this.opacity >= 1 || this.opacity <= 0.1) {
          this.pulseDirection *= -1;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between nearby particles
      drawConnections();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Draw connections between particles
    const drawConnections = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance * 0.2;
            
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(139, 0, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Mouse interaction
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      particlesRef.current.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.speedX += (dx / distance) * force * 0.1;
          particle.speedY += (dy / distance) * force * 0.1;
          
          // Limit speed
          particle.speedX = Math.max(-3, Math.min(3, particle.speedX));
          particle.speedY = Math.max(-3, Math.min(3, particle.speedY));
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <ParticleCanvas
      ref={canvasRef}
      aria-hidden="true"
    />
  );
};

const ParticleCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
`;

export default ParticleBackground;

