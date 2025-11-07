'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Menu, X, Search, User, ShoppingBag, Filter, Grid3X3, List } from 'lucide-react'

// Type definitions
interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  ratingCount: number
  image: string
  category: string
  description: string
  sizes: string[]
  colors: string[]
  tags: string[]
}

interface CartItem extends Product {
  selectedSize: string
  selectedColor: string
  cartId: number
}

// Product data with Myntra-style information
const products: Product[] = [
  {
    id: 1,
    name: "Professional Chaos Tee",
    brand: "Chaos & Comedy Co.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.3,
    ratingCount: 2847,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt1.jpg",
    category: "t-shirts",
    description: "I'M NOT MESSY, I'M CREATIVELY ORGANIZED",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy Blue"],
    tags: ["Comedy", "Trending", "Bestseller"]
  },
  {
    id: 2,
    name: "Social Media Reality Tee",
    brand: "Chaos & Comedy Co.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.1,
    ratingCount: 1523,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt.jpg",
    category: "t-shirts",
    description: "POSTING MY LIFE, PRETENDING IT'S TOGETHER",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey", "Deep Purple"],
    tags: ["Social Media", "Relatable", "New"]
  },
  {
    id: 3,
    name: "Cozy Chaos Hoodie",
    brand: "Chaos & Comedy Co.",
    price: 1699,
    originalPrice: 2199,
    discount: 23,
    rating: 4.5,
    ratingCount: 892,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcI97_n8HMZa46mcB95W2XvrmSOLlCMjnvA&s",
    category: "hoodies",
    description: "Where comfort meets comedy",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal Black", "Deep Purple", "Navy Blue"],
    tags: ["Comfort", "Winter", "Premium"]
  },
  {
    id: 4,
    name: "Chaos Meter Pin Set",
    brand: "Chaos & Comedy Co.",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.7,
    ratingCount: 1847,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvU1qn1KhwLIXI9URKXKwC6Ty0kfOmg4Sel13f4OBsEJSlfAvnRaqnTPlypoMZ5DGCbI&usqp=CAU",
    category: "accessories",
    description: "Set of 4 enamel pins including Chaos Meter & Comedy Mic",
    sizes: ["One Size"],
    colors: ["Multi-color"],
    tags: ["Collectible", "Limited Edition", "Bestseller"]
  },
  {
    id: 5,
    name: "Professionally Chaotic Cap",
    brand: "Chaos & Comedy Co.",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.2,
    ratingCount: 743,
    image: "https://via.placeholder.com/400x400/ff3f6c/FFFFFF?text=Chaotic+Cap",
    category: "caps",
    description: "PROFESSIONALLY CHAOTIC - Bold statement cap",
    sizes: ["Adjustable"],
    colors: ["Electric Blue", "Black", "White"],
    tags: ["Casual", "Statement", "Trending"]
  },
  {
    id: 6,
    name: "Adulting Chronicles Tee",
    brand: "Chaos & Comedy Co.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.4,
    ratingCount: 1329,
    image: "https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt2.jpg",
    category: "t-shirts",
    description: "ADULTING LEVEL: STILL GOOGLING HOW TO ADULT",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["All colors available"],
    tags: ["Adulting", "Funny", "Relatable"]
  }
]

// Main Page Component
export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = (product: Product, size: string, color: string) => {
    const cartItem: CartItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      cartId: Date.now() + Math.random()
    }
    setCart(prev => [...prev, cartItem])
  }

  const addToWishlist = (productId: number) => {
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

  const searchedProducts = searchQuery
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredProducts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Myntra-style Header */}
      <header className="myntra-header sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-800">
                <span className="text-pink-500">CHAOS</span>
                <span className="text-gray-800"> & COMEDY</span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#men" className="myntra-nav-item">MEN</a>
              <a href="#women" className="myntra-nav-item">WOMEN</a>
              <a href="#accessories" className="myntra-nav-item">ACCESSORIES</a>
              <a href="#sale" className="myntra-nav-item text-pink-500">SALE</a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for Comedy Merch, Samay Collection and more..."
                className="myntra-search pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors">
                <User size={20} />
                <span className="text-xs mt-1 hidden md:block">Profile</span>
              </button>
              
              <button className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors relative">
                <Heart size={20} />
                <span className="text-xs mt-1 hidden md:block">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition-colors relative"
              >
                <ShoppingBag size={20} />
                <span className="text-xs mt-1 hidden md:block">Bag</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Comedy Merch..."
                className="myntra-search pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
          >
            <nav className="px-4 py-4 space-y-4">
              <a href="#men" className="block myntra-nav-item">MEN</a>
              <a href="#women" className="block myntra-nav-item">WOMEN</a>
              <a href="#accessories" className="block myntra-nav-item">ACCESSORIES</a>
              <a href="#sale" className="block myntra-nav-item text-pink-500">SALE</a>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="myntra-breadcrumb">
          <a href="/">Home</a> / <a href="/comedy">Comedy Merch</a> / <span className="text-gray-800">Samay Collection</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="myntra-hero py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SAMAY'S COMEDY COLLECTION
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Merch that gets your beautiful chaos. Pre-order for just ₹1!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="myntra-btn-primary bg-white text-purple-600 hover:bg-gray-100"
            >
              SHOP COLLECTION
            </button>
            <button 
              onClick={() => {
                window.open('https://www.youtube.com/@SamayRainaOfficial', '_blank');
              }}
              className="myntra-btn-secondary border-white text-white hover:bg-white hover:text-purple-600"
            >
              WATCH SAMAY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort Section */}
      <section id="products" className="container mx-auto px-4 py-8">
        {/* Category & Filter Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Samay's Collection</h2>
            <p className="text-gray-600">{searchedProducts.length} items found</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">FILTERS:</span>
              {['all', 't-shirts', 'hoodies', 'accessories', 'caps'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`myntra-filter-chip ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">SORT BY:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="myntra-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Discount</option>
                <option value="newest">What's New</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
            : 'space-y-4'
        }`}>
          {searchedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              isWishlisted={wishlist.includes(product.id)}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {searchedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="myntra-btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* About Section - Myntra Style */}
      <section id="about" className="myntra-about-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Samay's Comedy Collection
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Born from the beautiful chaos of modern life, Chaos & Comedy Co. brings you merchandise 
                that perfectly captures the essence of organized disorder and heartfelt humor.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Every design is crafted with love, chaos, and just the right amount of self-deprecating humor. 
                Because if you can't laugh at your own mess, what's the point?
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-500 mb-2">25K+</div>
                  <div className="text-sm text-gray-600">Expected Traffic</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">₹1</div>
                  <div className="text-sm text-gray-600">Pre-order Price</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">31%</div>
                  <div className="text-sm text-gray-600">Max Discount</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="myntra-testimonial-card">
                <div className="text-center mb-4">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLlVJmI8bTV2_3uZV8VwpyY_v7yV9xYcWpg&s" 
                    alt="Samay Raina" 
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800">SAMAY RAINA</h3>
                  <p className="text-sm text-gray-600">Comedian & Chaos Creator</p>
                </div>
                
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "Life's a joke, might as well get the punchline right"
                </blockquote>
                
                <div className="flex justify-center space-x-1 mb-3">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="text-amber-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">5/5 for organized chaos</p>
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
            className="myntra-cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="myntra-cart-header">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Shopping Bag</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
              {cart.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">{cart.length} item{cart.length > 1 ? 's' : ''} in your bag</p>
              )}
            </div>
            
            <div className="myntra-cart-content">
              {cart.length === 0 ? (
                <div className="myntra-empty-cart">
                  <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Your bag is empty</h4>
                  <p className="text-gray-500 text-center mb-6">Add some items to get started</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="myntra-btn-primary w-full"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartId} className="myntra-cart-item">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="myntra-cart-item-image" 
                      />
                      <div className="myntra-cart-item-details">
                        <p className="myntra-cart-brand">{item.brand}</p>
                        <h4 className="myntra-cart-name">{item.name}</h4>
                        <p className="myntra-cart-variant">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <div className="myntra-cart-price">
                          <span className="font-bold text-gray-800">₹{item.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="myntra-remove-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="myntra-cart-footer">
                <div className="myntra-cart-total">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-xl font-bold text-gray-800">₹{getCartTotal()}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>• Pre-order amount: ₹{cart.length}</p>
                    <p>• Remaining: ₹{getCartTotal() - cart.length} (Pay on delivery)</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      window.location.href = '/checkout';
                    }}
                    className="myntra-checkout-btn"
                  >
                    PLACE ORDER
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="myntra-btn-secondary w-full"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Footer - Myntra Style */}
      <footer className="myntra-footer">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">CHAOS & COMEDY CO.</h3>
              <p className="text-gray-600 text-sm mb-4">
                Merch that celebrates your beautiful chaos
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.open('https://www.youtube.com/@SamayRainaOfficial', '_blank')}
                  className="text-gray-600 hover:text-pink-500"
                >
                  YouTube
                </button>
                <button className="text-gray-600 hover:text-pink-500">Instagram</button>
                <button className="text-gray-600 hover:text-pink-500">Twitter</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">CUSTOMER POLICIES</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-800">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-800">T&C</a></li>
                <li><a href="#" className="hover:text-gray-800">Track Orders</a></li>
                <li><a href="#" className="hover:text-gray-800">Shipping</a></li>
                <li><a href="#" className="hover:text-gray-800">Cancellation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">EXPERIENCE APP</h4>
              <p className="text-sm text-gray-600 mb-4">Get the full comedy experience</p>
              <div className="space-y-2">
                <button className="block w-full text-left text-sm text-gray-600 hover:text-gray-800">
                  📱 Download Android App
                </button>
                <button className="block w-full text-left text-sm text-gray-600 hover:text-gray-800">
                  🍎 Download iOS App
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">KEEP IN TOUCH</h4>
              <div className="myntra-newsletter">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="myntra-newsletter-input"
                />
                <button className="myntra-newsletter-btn">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 Chaos & Comedy Co. All rights reserved. | Built for Masters' Union Challenge
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: Product
  index: number
  onAddToCart: (product: Product, size: string, color: string) => void
  onAddToWishlist: (productId: number) => void
  isWishlisted: boolean
  viewMode: 'grid' | 'list'
}

function ProductCard({ product, index, onAddToCart, onAddToWishlist, isWishlisted, viewMode }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [showQuickView, setShowQuickView] = useState(false)

  if (viewMode === 'list') {
    return (
      <motion.div
        className="myntra-product-card-list"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        <div className="relative myntra-image-container-list">
          <img 
            src={product.image} 
            alt={product.name}
            className="myntra-product-image-list"
          />
          <div className="myntra-discount-badge">
            {product.discount}% OFF
          </div>
          <button 
            onClick={() => onAddToWishlist(product.id)}
            className="myntra-wishlist-btn"
          >
            <Heart 
              size={18} 
              className={isWishlisted ? 'text-pink-500 fill-current' : 'text-gray-500'} 
            />
          </button>
        </div>
        
        <div className="myntra-product-info-list">
          <div className="flex-1">
            <p className="myntra-brand-name">{product.brand}</p>
            <h3 className="myntra-product-name">{product.name}</h3>
            <p className="myntra-product-description">{product.description}</p>
            
            <div className="myntra-rating-section">
              <div className="myntra-rating">
                <Star size={12} className="text-teal-600 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="myntra-rating-count">({product.ratingCount})</span>
            </div>

            <div className="myntra-price-section">
              <span className="myntra-price">₹{product.price}</span>
              <span className="myntra-original-price">₹{product.originalPrice}</span>
              <span className="myntra-discount-percent">({product.discount}% OFF)</span>
            </div>

            <div className="myntra-tags">
              {product.tags.map((tag) => (
                <span key={tag} className="myntra-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="myntra-product-actions-list">
            <div className="space-y-2 mb-4">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="myntra-size-select"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <select 
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="myntra-color-select"
              >
                {product.colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="myntra-add-to-cart-btn"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="myntra-product-card group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      <div className="relative myntra-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="myntra-product-image"
        />
        
        {/* Discount Badge */}
        <div className="myntra-discount-badge">
          {product.discount}% OFF
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={() => onAddToWishlist(product.id)}
          className="myntra-wishlist-btn"
        >
          <Heart 
            size={18} 
            className={isWishlisted ? 'text-pink-500 fill-current' : 'text-gray-500'} 
          />
        </button>

        {/* Quick View on Hover */}
        {showQuickView && (
          <motion.div 
            className="myntra-quick-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="myntra-size-selection">
              <p className="text-xs font-medium mb-2">SELECT SIZE</p>
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 4).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`myntra-size-btn ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="myntra-quick-add-btn"
            >
              <ShoppingBag size={16} />
              ADD TO BAG
            </button>
          </motion.div>
        )}
      </div>
      
      <div className="myntra-product-info">
        <p className="myntra-brand-name">{product.brand}</p>
        <h3 className="myntra-product-name">{product.name}</h3>
        
        <div className="myntra-rating-section">
          <div className="myntra-rating">
            <Star size={12} className="text-teal-600 fill-current" />
            <span>{product.rating}</span>
          </div>
          <span className="myntra-rating-count">({product.ratingCount})</span>
        </div>

        <div className="myntra-price-section">
          <span className="myntra-price">₹{product.price}</span>
          <span className="myntra-original-price">₹{product.originalPrice}</span>
          <span className="myntra-discount-percent">({product.discount}% OFF)</span>
        </div>

        <div className="myntra-tags">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="myntra-tag">{tag}</span>
          ))}
        </div>
        
        <p className="myntra-preorder-text">
          Pre-order for ₹1 • Full payment on delivery
        </p>
      </div>
    </motion.div>
  )
}