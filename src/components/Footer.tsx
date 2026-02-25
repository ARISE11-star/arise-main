
import { Link } from "react-router-dom";

const Footer = () =>
  <footer className="border-t border-border bg-card/50 mt-12">
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="ARISE logo" className="h-8 w-8 rounded-lg object-cover" />
          <span className="text-lg font-bold text-foreground">​ARISE</span>
        </Link>
        <p className="text-xs text-muted-foreground">
          The best streaming experience for your favorite movies and shows.
        </p>
      </div>
      {/* Support Server Banner */}
      <div className="mt-8 rounded-xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 border border-indigo-500/30 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">📢 Stay Updated</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Get notified about updates &amp; downtime by joining our Support Server.
          </p>
        </div>
        <a
          href="https://discord.gg/g6Hh8xmuEZ"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 text-xs font-semibold text-white"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          Join Discord
        </a>
      </div>

      {/* DMCA Notice */}
      <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-center">
        <p className="text-xs text-yellow-400/80">
          ⚠️ <span className="font-semibold">DMCA Notice:</span> ARISE does not host or store any content. All media is sourced via third-party embeds. We are not responsible for external content.
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">© 2026 ARISE. All Rights Reserved.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Use</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
        </div>
      </div>
    </div>
  </footer>;


export default Footer;
