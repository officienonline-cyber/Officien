

export const Footer = () => {
  const socials = [
    {
      name: "Behance",
      href: "https://behance.net",
      content: <span className="font-space font-bold text-[14px]">Bē</span>,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      content: (
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "https://dribbble.com",
      content: (
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      content: (
        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      content: (
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      content: (
        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-transparent border-t border-white/[0.04] py-12 font-sans relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      <div className="max-width-container mx-auto px-6 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left Side: Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <a 
              href="#home" 
              onClick={(e) => { 
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                <div className="bg-accent rounded-[1.5px]" />
                <div className="bg-accent rounded-[1.5px]" />
                <div className="bg-accent rounded-[1.5px]" />
                <div className="bg-accent rounded-[1.5px]" />
              </div>
              <span className="font-space text-lg font-bold tracking-tight text-text-primary">
                Officien<span className="text-accent">Hub</span>
              </span>
            </a>
            
            {/* Divider (only on desktop) */}
            <span className="hidden sm:inline text-white/10">|</span>
            
            <span className="text-text-muted text-[13px] font-sans">
              © 2026. All rights reserved.
            </span>
          </div>

          {/* Right Side: Orbit Social Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 flex items-center justify-center group text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                title={social.name}
              >
                {/* Inner rotating orbit arc */}
                <div className="absolute inset-0 rounded-full border border-white/20 border-r-transparent border-b-transparent group-hover:border-accent transition-all duration-500 group-hover:rotate-180" />
                {/* Outer offset counter-rotating orbit arc */}
                <div className="absolute -inset-1.5 rounded-full border border-white/5 border-l-transparent border-t-transparent group-hover:border-accent/40 transition-all duration-700 group-hover:-rotate-180" />
                {/* Icon/Content */}
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {social.content}
                </span>
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};
