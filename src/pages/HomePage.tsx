import { ArrowRight, Truck, Shield, Headphones, CreditCard, TrendingUp, Star } from 'lucide-react';
import type { Product } from '../data/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export default function HomePage({ products, loading, onAddToCart, onViewDetails, onNavigate }: HomePageProps) {
  const popularProducts = products.filter(p => p.rating >= 4.5).slice(0, 4);
  const saleProducts = products.filter(p => p.oldPrice).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm">
              <TrendingUp size={16} /> Скидки до 30% на офисную технику
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Оргтехника для <br />
              <span className="text-blue-300">вашего офиса</span>
            </h1>
            <p className="text-lg text-blue-200 mb-8 max-w-lg">
              Принтеры, МФУ, мониторы, сканеры и всё необходимое для эффективной работы. 
              Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-xl"
              >
                Перейти в каталог <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition"
              >
                О компании
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Бесплатная доставка', desc: 'От 30 000 ₽' },
              { icon: Shield, title: 'Гарантия', desc: 'До 3 лет' },
              { icon: Headphones, title: 'Поддержка', desc: '24/7 онлайн' },
              { icon: CreditCard, title: 'Оплата', desc: 'Любым способом' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="bg-blue-50 p-2.5 rounded-lg">
                  <feature.icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                  <div className="text-xs text-gray-500">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Популярные товары</h2>
            <p className="text-gray-500 mt-1">Лучшие предложения по отзывам покупателей</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="hidden md:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Все товары <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Sale Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">🔥 Распродажа оргтехники!</h2>
              <p className="text-orange-100 mt-1">Скидки до 30% на избранные товары. Успейте купить!</p>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition shadow-lg"
            >
              Смотреть акции
            </button>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🔥 Товары со скидкой</h2>
            <p className="text-gray-500 mt-1">Специальные предложения этой недели</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Алексей К.', role: 'Директор ООО "Прогресс"', text: 'Отличный магазин! Заказывали принтеры для офиса — доставили на следующий день. Качество на высоте!', rating: 5 },
              { name: 'Мария С.', role: 'Офис-менеджер', text: 'Покупаем здесь технику уже 3 года. Всегда хорошие цены, быстрая доставка и отличная поддержка.', rating: 5 },
              { name: 'Дмитрий В.', role: 'IT-специалист', text: 'Широкий ассортимент и профессиональные консультанты. Помогли подобрать оборудование под наши задачи.', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
