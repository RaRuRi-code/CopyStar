import { ShoppingCart, Star, Eye } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-48">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
          {product.category === 'printers' && 'Принтеры'}
          {product.category === 'monitors' && 'Мониторы'}
          {product.category === 'scanners' && 'Сканеры'}
          {product.category === 'projectors' && 'Проекторы'}
          {product.category === 'shredders' && 'Шредеры'}
          {product.category === 'accessories' && 'Аксессуары'}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            <ShoppingCart size={16} />
            В корзину
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="p-2.5 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition"
            title="Подробнее"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
