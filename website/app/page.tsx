'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Menu, X, ArrowRight, Filter, Search, User, ChevronDown } from 'lucide-react'

// Product data with Myntra-style information
const products = [
  {
    id: 1,
    name: "Professional Chaos Tee",
    brand: "Chaos & Comedy Co.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt1.jpg",
    category: "t-shirts",
    description: "I'M NOT MESSY, I'M CREATIVELY ORGANIZED",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy Blue"],
    rating: 4.5,
    reviews: 127,
    tags: ["Bestseller", "Comedy", "Trendy"]
  },
  {
    id: 2,
    name: "Social Media Reality Tee",
    brand: "Chaos & Comedy Co.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt.jpg",
    category: "t-shirts",
    description: "POSTING MY LIFE, PRETENDING IT'S TOGETHER",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey", "Deep Purple"],
    rating: 4.3,
    reviews: 89,
    tags: ["New", "Relatable", "Social"]
  },
  {
    id: 3,
    name: "Cozy Chaos Hoodie",
    brand: "Chaos & Comedy Co.",
    price: 1699,
    originalPrice: 2199,
    discount: 23,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcI97_n8HMZa46mcB95W2XvrmSOLlCMjnvA&s",
    category: "hoodies",
    description: "Where comfort meets comedy",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal Black", "Deep Purple", "Navy Blue"],
    rating: 4.7,
    reviews: 156,
    tags: ["Premium", "Comfort", "Winter"]
  },
  {
    id: 4,
    name: "Chaos Meter Pin Set",
    brand: "Chaos & Comedy Co.",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvU1qn1KhwLIXI9URKXKwC6Ty0kfOmg4Sel13f4OBsEJSlfAvnRaqnTPlypoMZ5DGCbI&usqp=CAU",
    category: "pins",
    description: "Set of 4 enamel pins including Chaos Meter & Comedy Mic",
    sizes: ["One Size"],
    colors: ["Multi-color"],
    rating: 4.8,
    reviews: 243,
    tags: ["Limited", "Collectible", "Gift"]
  },
  {
    id: 5,
    name: "Professionally Chaotic Cap",
    brand: "Chaos & Comedy Co.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: "https://via.placeholder.com/400x400/00BFFF/FFFFFF?text=Chaotic+Cap",
    category: "caps",
    description: "PROFESSIONALLY CHAOTIC - Bold statement cap",
    sizes: ["Adjustable"],
    colors: ["Electric Blue", "Black", "White"],
    rating: 4.4,
    reviews: 78,
    tags: ["Statement", "Bold", "Casual"]
  },
  {
    id: 6,
    name: "Adulting Chronicles Tee",
    brand: "Chaos & Comedy Co.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt2.jpg",
    category: "t-shirts",
    description: "ADULTING LEVEL: STILL GOOGLING HOW TO ADULT",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["All colors available"],
    rating: 4.6,
    reviews: 201,
    tags: ["Funny", "Relatable", "Popular"]
  }
]

// Myntra-style Product Card Component
function ProductCard({ product, index, onAddToCart, isWishlisted, onToggleWishlist }: {
  product: any,
  index: number,
  onAddToCart: (product: any, size: string, color: string) => void,
  isWishlisted: boolean,
  onToggleWishlist: () => void
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [showSizes, setShowSizes] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist button */}
        <button 
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'} 
          />
        </button>

        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}

        {/* Quick add to bag on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="p-3">
            {!showSizes ? (
              <button 
                onClick={() => setShowSizes(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                ADD TO BAG
              </button>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  {product.sizes.slice(0, 6).map((size: string) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        onAddToCart(product, size, selectedColor)
                        setShowSizes(false)
                      }}
                      className="border border-gray-300 py-1 text-xs rounded hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
          <span className="text-xs text-orange-600 font-semibold">({product.discount}% OFF)</span>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-emerald-600 font-medium">
          Pre-order for ₹1 • Full payment on delivery
        </p>
      </div>
    </motion.div>
  )
}

// Main Page Component
export default function Home() {
  const [cart, setCart] = useState<any[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popularity')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  const addToCart = (product: any, size: string, color: string) => {
    const cartItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      cartId: Date.now() + Math.random()
    }
    setCart(prev => [...prev, cartItem])
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'discount': return b.discount - a.discount
      default: return b.reviews - a.reviews // popularity
    }
  })

  return (
    <div className="min-h-screen bg-white myntra-theme">
      {/* Myntra-style Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <motion.div 
                className="text-2xl font-bold text-indigo-700"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                CHAOS & COMEDY
              </motion.div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#men" className="text-gray-700 hover:text-indigo-600 font-medium">MEN</a>
                <a href="#women" className="text-gray-700 hover:text-indigo-600 font-medium">WOMEN</a>
                <a href="#accessories" className="text-gray-700 hover:text-indigo-600 font-medium">ACCESSORIES</a>
                <a href="#sale" className="text-orange-600 font-bold">SALE</a>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-indigo-600">
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </div>
              
              <div className="flex items-center space-x-1 cursor-pointer hover:text-indigo-600">
                <Heart size={20} />
                <span className="text-sm font-medium">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>

              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center space-x-1 cursor-pointer hover:text-indigo-600 relative"
              >
                <ShoppingCart size={20} />
                <span className="text-sm font-medium">Bag</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner - Bhawa Style */}
      <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Samay's Official Store
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Comedy merchandise that captures your deepest emotions & beautiful chaos
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  productsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => {
                  window.open('https://www.youtube.com/@SamayRainaOfficial', '_blank');
                }}
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Watch Samay
              </button>
            </motion.div>

            <div className="mt-8 text-sm text-gray-600">
              <p>🔥 Pre-order now for just ₹1 • Free shipping • 20% early bird discount</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Myntra-style filters */}
      <section id="products" className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-800">Samay Collection</span>
          </div>

          {/* Title and results count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Samay Collection</h2>
              <p className="text-gray-600">{sortedProducts.length} items</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                <Filter size={16} />
                <span>Filter</span>
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-300 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-64 bg-white border border-gray-200 rounded-lg p-6 h-fit">
                <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {['all', 't-shirts', 'hoodies', 'pins', 'caps'].map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm capitalize">{category.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm">₹200 - ₹500</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm">₹500 - ₹1000</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm">₹1000+</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2].map(rating => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-indigo-600 focus:ring-indigo-500" />
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">{rating}★ & above</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    onAddToCart={addToCart}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar - Myntra Style */}
      {isCartOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div 
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Shopping Bag</h3>
                <button onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 mb-4">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item: any) => (
                    <div key={item.cartId} className="flex items-center space-x-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.selectedSize} | {item.selectedColor}</p>
                        <p className="font-bold text-indigo-600">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-indigo-600">₹{getCartTotal()}</span>
                </div>
                <button 
                  onClick={() => {
                    localStorage.setItem('chaosCart', JSON.stringify(cart));
                    window.location.href = '/checkout';
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  PROCEED TO CHECKOUT (₹1 TEST)
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  *Test payment gateway - only ₹1 will be charged
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Footer - Bhawa Style */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 text-gray-200 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CHAOS & COMEDY CO.</h3>
              <p className="text-sm text-gray-300">
                Official merchandise store for Samay Raina. Embrace the beautiful chaos of life with our comedy-inspired collection that speaks to your emotions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">SHOP</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">T-Shirts</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Hoodies</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">CUSTOMER SERVICE</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">CONNECT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Chaos & Comedy Co. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}