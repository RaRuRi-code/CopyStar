import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Телефон', value: '8 (800) 555-35-35', sub: 'Бесплатно по России' },
              { icon: Mail, label: 'Email', value: 'info@ofisteh.ru', sub: 'Ответим в течение часа' },
              { icon: MapPin, label: 'Адрес', value: 'Москва, ул. Офисная, 42', sub: 'Метро Технопарк, 5 мин' },
              { icon: Clock, label: 'Режим работы', value: 'Пн-Пт: 9:00-18:00', sub: 'Сб-Вс: выходной' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                  <item.icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="font-semibold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="mx-auto text-blue-600 mb-2" />
              <p className="text-blue-800 font-medium">Москва, ул. Офисная, 42</p>
              <p className="text-blue-600 text-sm">Метро Технопарк</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Напишите нам</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Иван Иванов"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="ivan@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                placeholder="Ваш вопрос или пожелание..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
            >
              <Send size={18} />
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
