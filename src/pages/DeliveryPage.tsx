import { Truck, Clock, CreditCard, Package, MapPin, CheckCircle } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Доставка и оплата</h1>

      {/* Delivery options */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Truck size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Доставка по Москве</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Курьерская доставка — <strong>от 500 ₽</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Бесплатно при заказе от 30 000 ₽</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Срок: 1-2 рабочих дня</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Доставка в день заказа (при оформлении до 12:00)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <Package size={24} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Доставка по России</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Транспортные компании — <strong>от 300 ₽</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>СДЭК, Boxberry, Почта России</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Срок: 3-10 рабочих дней</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>Отслеживание посылки онлайн</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Способы оплаты</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { icon: CreditCard, title: 'Банковская карта', desc: 'Visa, MasterCard, МИР' },
          { icon: MapPin, title: 'Наличные', desc: 'При получении курьеру' },
          { icon: Clock, title: 'Безналичный расчёт', desc: 'Для юридических лиц' },
        ].map((method, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <method.icon size={32} className="mx-auto text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
            <p className="text-sm text-gray-500">{method.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
      <div className="space-y-3">
        {[
          { q: 'Можно ли забрать заказ самостоятельно?', a: 'Да, вы можете забрать заказ из нашего офиса по адресу: Москва, ул. Офисная, 42. Пн-Пт с 9:00 до 18:00.' },
          { q: 'Как отследить заказ?', a: 'После отправки заказа вы получите SMS и email с трек-номером для отслеживания.' },
          { q: 'Возможна ли доставка в выходные?', a: 'Да, доставка в выходные дни возможна по предварительной договорённости. Стоимость — от 800 ₽.' },
          { q: 'Есть ли подъём на этаж?', a: 'Да, подъём крупногабаритных товаров осуществляется за дополнительную плату — от 200 ₽ за этаж.' },
        ].map((faq, i) => (
          <details key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
            <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition list-none flex justify-between items-center">
              {faq.q}
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
