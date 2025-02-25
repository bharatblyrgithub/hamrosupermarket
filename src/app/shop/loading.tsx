export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Header and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="h-10 bg-gray-200 rounded w-32 mb-4 md:mb-0"></div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter Placeholder */}
              <div className="h-10 bg-gray-200 rounded w-48"></div>
              
              {/* Sort Options Placeholder */}
              <div className="h-10 bg-gray-200 rounded w-48"></div>
              
              {/* Price Range Filter Placeholder */}
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 flex items-center">-</div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                
                {/* Product Details Placeholders */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  
                  {/* Price and Add to Cart Button Placeholder */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
