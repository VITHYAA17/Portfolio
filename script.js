document.addEventListener("DOMContentLoaded", function () {
  // Reveal animations on scroll
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });

  // Mobile menu hamburger toggle logic
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      const isFlex = window.getComputedStyle(navLinks).display === "flex";
      navLinks.style.display = isFlex ? "none" : "flex";
    });
  }

  // Glitter Particle Animation
  const canvas = document.getElementById("glitter-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const colors = ["#ff7b72", "#e5c158", "#ffffff", "#ffb3a7"];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Glitter {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -10;
        this.size = Math.random() * 2 + 0.5; // very fine dots (0.5px to 2.5px)
        this.speedY = Math.random() * 0.5 + 0.15; // slow fall speed
        this.speedX = Math.random() * 0.3 - 0.15; // slight side breeze
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.maxOpacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.25 + this.speedX;
        this.angle += this.spinSpeed;

        // Reset if off bottom or sides
        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Add subtle glow to larger particles
        if (this.size > 1.8) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = this.color;
        }
        
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particle array (approx. 65 particles for clean performance)
    const particleCount = 65;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Glitter());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
});
