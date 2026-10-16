import { X, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          <button onClick={onClose} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-4 transition">
            <ArrowLeft size={16} /> Назад к каталогу
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center md:w-1/2 shrink-0">
              <span className="text-8xl">{product.image}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                {product.category === 'printers' && 'Принтеры и МФУ'}
                {product.category === 'monitors' && 'Мониторы'}
                {product.category === 'scanners' && 'Сканеры'}
                {product.category === 'projectors' && 'Проекторы'}
                {product.category === 'shredders' && 'Шредеры'}
                {product.category === 'accessories' && 'Аксессуары'}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{product.rating} · {product.reviews} отзывов</span>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price */}
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="mb-4">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    В наличии
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-500 text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Нет в наличии
                  </span>
                )}
              </div>

              {/* Add to cart */}
              <button
                onClick={() => { onAddToCart(product); onClose(); }}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
              >
                <ShoppingCart size={20} />
                Добавить в корзину
              </button>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Характеристики</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 text-sm">{key}</span>
                  <span className="text-gray-900 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
