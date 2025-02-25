export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Category Header Loading State */}
        <div className="relative h-72 rounded-xl overflow-hidden mb-12 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/10 flex items-center">
            <div className="px-8">
              <div className="h-10 w-64 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 w-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Products Grid Loading State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Image placeholder */}
              <div className="h-56 bg-gray-200 animate-pulse"></div>
              
              <div className="p-6">
                {/* Title and description placeholders */}
                <div className="mb-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mt-1"></div>
                </div>

                <div className="space-y-3">
                  {/* Price and rating placeholders */}
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Reviews and button placeholders */}
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
