'use client';

interface QuantitySelectorProps {
  quantity: number;
  stock: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, stock, onChange }: QuantitySelectorProps) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= stock) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
        className="w-8 h-8 flex items-center justify-center border rounded-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-medium">−</span>
      </button>
      
      <input
        type="number"
        min="1"
        max={stock}
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center border rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label="Quantity"
      />
      
      <button
        onClick={increaseQuantity}
        disabled={quantity >= stock}
        className="w-8 h-8 flex items-center justify-center border rounded-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-medium">+</span>
      </button>

      <span className="text-sm text-gray-500">
        {stock} available
      </span>
    </div>
  );
};

export default QuantitySelector;
