'use client';

interface Variant {
  name: string;
  value: string;
  type: 'color' | 'size' | 'other';
  inStock: boolean;
}

interface ProductVariantsProps {
  variants: {
    [key: string]: Variant[];
  };
  selectedVariants: {
    [key: string]: string;
  };
  onVariantChange: (type: string, value: string) => void;
}

const ProductVariants = ({ variants, selectedVariants, onVariantChange }: ProductVariantsProps) => {
  const renderVariantOption = (variant: Variant) => {
    switch (variant.type) {
      case 'color':
        return (
          <button
            key={variant.value}
            onClick={() => onVariantChange('color', variant.value)}
            disabled={!variant.inStock}
            className={`
              w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${selectedVariants.color === variant.value 
                ? 'ring-2 ring-orange-500 ring-offset-2' 
                : 'ring-1 ring-gray-200'
              }
              ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{ backgroundColor: variant.value }}
            aria-label={`Select color ${variant.name}`}
            title={variant.name}
          />
        );
      
      case 'size':
        return (
          <button
            key={variant.value}
            onClick={() => onVariantChange('size', variant.value)}
            disabled={!variant.inStock}
            className={`
              px-4 py-2 text-sm font-medium rounded-md border
              ${selectedVariants.size === variant.value
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
              }
              ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Select size ${variant.name}`}
          >
            {variant.name}
          </button>
        );
      
      default:
        return (
          <button
            key={variant.value}
            onClick={() => onVariantChange(variant.type, variant.value)}
            disabled={!variant.inStock}
            className={`
              px-4 py-2 text-sm font-medium rounded-md border
              ${selectedVariants[variant.type] === variant.value
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
              }
              ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Select ${variant.type} ${variant.name}`}
          >
            {variant.name}
          </button>
        );
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(variants).map(([type, options]) => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 capitalize">
            Select {type}
          </h3>
          <div className="flex flex-wrap gap-2">
            {options.map(variant => renderVariantOption(variant))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
