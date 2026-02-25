import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const links = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/shows", label: "TV Shows" }];


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="ARISE logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-xl font-bold text-foreground">​ARISE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-secondary/60 rounded-full px-2 py-1">
          {links.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${location.pathname === link.to ?
                  "bg-secondary text-foreground" :
                  "text-muted-foreground hover:text-foreground"}`
              }>

              {link.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {searchOpen ?
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies & shows..."
                className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                onBlur={() => !query && setSearchOpen(false)} />

            </form> :

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">

              <Search className="h-5 w-5" />
            </button>
          }
        </div>
      </div>
    </header>);

};

export default Navbar;
