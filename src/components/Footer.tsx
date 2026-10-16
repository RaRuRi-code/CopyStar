import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🖥️</span>
              <div>
                <div className="text-white font-bold text-lg">ОфисТех</div>
                <div className="text-xs text-gray-500">Магазин оргтехники</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Надёжный поставщик оргтехники для бизнеса с 2010 года. Более 10 000 довольных клиентов по всей России.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-white font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition">Принтеры и МФУ</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Мониторы</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Сканеры</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Проекторы</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Шредеры</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Аксессуары</span></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition">О компании</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Доставка и оплата</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Гарантия</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Возврат товара</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Политика конфиденциальности</span></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <span>8 (800) 555-35-35</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <span>info@ofisteh.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Москва, ул. Офисная, 42</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {['VK', 'TG', 'YT'].map((social) => (
                <div key={social} className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition">
                  {social}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <span>© 2024 ОфисТех. Все права защищены.</span>
          <span>Разработано с ❤️ для вашего бизнеса</span>
        </div>
      </div>
    </footer>
  );
}
