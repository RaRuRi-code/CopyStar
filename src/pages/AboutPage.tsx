import { Building2, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">О компании ОфисТех</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Наша миссия</h2>
          <p className="text-gray-600 leading-relaxed">
            Мы помогаем бизнесу работать эффективнее, предоставляя качественную оргтехнику от ведущих мировых производителей. 
            С 2010 года мы оснащаем офисы по всей России — от малых предприятий до крупных корпораций.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Наши преимущества</h2>
          <ul className="text-gray-600 space-y-2">
            <li>✅ Более 10 000 довольных клиентов</li>
            <li>✅ Прямые поставки от производителей</li>
            <li>✅ Собственный сервисный центр</li>
            <li>✅ Гарантия до 3 лет на всю технику</li>
            <li>✅ Бесплатная консультация специалиста</li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Building2, value: '15+', label: 'Лет на рынке' },
          { icon: Users, value: '10 000+', label: 'Клиентов' },
          { icon: Award, value: '50+', label: 'Брендов' },
          { icon: Target, value: '99%', label: 'Довольных клиентов' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <stat.icon size={32} className="mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Наша команда</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Иван Петров', role: 'Генеральный директор', emoji: '👨‍💼' },
          { name: 'Анна Сидорова', role: 'Руководитель отдела продаж', emoji: '👩‍💼' },
          { name: 'Сергей Козлов', role: 'Главный инженер', emoji: '👨‍🔧' },
        ].map((member, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-5xl mb-3">{member.emoji}</div>
            <h3 className="font-bold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
