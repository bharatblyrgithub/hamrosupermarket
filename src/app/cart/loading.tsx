export default function CartLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Header */}
          <div className="h-10 w-48 bg-gray-200 rounded mb-8"></div>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="border-t border-b border-gray-200">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex py-6 sm:py-10">
                    {/* Product Image */}
                    <div className="h-24 w-24 sm:h-32 sm:w-32 bg-gray-200 rounded-md"></div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      {/* Product Details */}
                      <div className="flex justify-between mb-4">
                        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="mt-4 flex justify-between">
                        <div className="h-10 w-32 bg-gray-200 rounded"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
                
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="h-12 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
