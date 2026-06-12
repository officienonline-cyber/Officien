import React, { useRef, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Projects } from "./sections/Projects";
import { ProjectsPage } from "./sections/ProjectsPage";
import { About } from "./sections/About";
import { Blog } from "./sections/Blog";
import { BlogPostDetail } from "./sections/BlogPostDetail";
import { BlogArticlesPage } from "./sections/BlogArticlesPage";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/Footer";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 195;

function App() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameIndexRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Track global window scroll position
  const { scrollY } = useScroll();
  
  // Animate the image frames over the first 1000px of scroll
  const frameIndex = useTransform(scrollY, [0, 1000], [0, TOTAL_FRAMES - 1]);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const r = Math.max(w / iw, h / ih);
      
      let nw = iw * r;
      let nh = ih * r;
      
      const x = (w - nw) / 2;
      const y = (h - nh) / 2;
      
      ctx.drawImage(img, x, y, nw, nh);
    }
  };

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/hero-animation/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (i - 1 === currentFrameIndexRef.current) {
          drawFrame(i - 1);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Handle canvas resizing
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      drawFrame(currentFrameIndexRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Listen to scroll frame index change and redraw
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(latest)));
    if (index !== currentFrameIndexRef.current) {
      currentFrameIndexRef.current = index;
      drawFrame(index);
    }
  });

  const handleBackFromDetail = () => {
    setActivePost(null);
    if (!showAllBlogs) {
      setTimeout(() => {
        const blogSection = document.getElementById("blog");
        if (blogSection) {
          const offset = 80;
          const elementRect = blogSection.getBoundingClientRect().top;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleBackFromAllBlogs = () => {
    setShowAllBlogs(false);
    setTimeout(() => {
      const blogSection = document.getElementById("blog");
      if (blogSection) {
        const offset = 80;
        const elementRect = blogSection.getBoundingClientRect().top;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  const handleBackFromAllProjects = () => {
    setShowAllProjects(false);
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const offset = 80;
        const elementRect = projectsSection.getBoundingClientRect().top;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent/30 selection:text-text-primary font-sans relative">
      {/* Global background canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        {/* Cinematic Color Grading overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-accent-alt/15 mix-blend-color" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,15,0)_15%,rgba(10,10,15,0.95)_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      </div>

      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-text-primary px-4 py-2 rounded-md z-[100] font-sans font-semibold border border-white/20 transition-all"
      >
        Skip to content
      </a>

      {/* Fixed Header Navbar */}
      {!activePost && !showAllBlogs && !showAllProjects && <Header />}

      {/* Main Content Sections */}
      {activePost ? (
        <BlogPostDetail post={activePost} onBack={handleBackFromDetail} />
      ) : showAllBlogs ? (
        <>
          <BlogArticlesPage onSelectPost={setActivePost} onBack={handleBackFromAllBlogs} />
          <Footer />
        </>
      ) : showAllProjects ? (
        <>
          <ProjectsPage onBack={handleBackFromAllProjects} />
          <Footer />
        </>
      ) : (
        <main id="main-content" className="relative z-10">
          <Hero />
          <Services />
          <Projects onViewAllClick={() => setShowAllProjects(true)} />
          <About />
          <Blog onSelectPost={setActivePost} onViewAllClick={() => setShowAllBlogs(true)} />
          <Contact />
        </main>
      )}

      {/* Footer Grid */}
      {!activePost && !showAllBlogs && !showAllProjects && <Footer />}
    </div>
  );
}

export default App;
