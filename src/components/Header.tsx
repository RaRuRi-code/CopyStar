import { ShoppingCart, Search, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ cartCount, onCartClick, onSearch, currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('catalog');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-xl sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-950/50 text-blue-200 text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> 8 (800) 555-35-35</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin size={12} /> Москва, ул. Офисная, 42</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} /> Пн-Пт: 9:00-18:00
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 shrink-0">
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-2xl">🖥️</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold leading-tight">ОфисТех</div>
              <div className="text-xs text-blue-300">Магазин оргтехники</div>
            </div>
          </button>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск оргтехники..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded-md text-sm font-medium transition">
                Найти
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block mt-3`}>
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-0">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'catalog', label: 'Каталог' },
              { id: 'about', label: 'О компании' },
              { id: 'delivery', label: 'Доставка' },
              { id: 'contacts', label: 'Контакты' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
