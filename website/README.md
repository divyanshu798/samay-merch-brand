# Samay's Merch Store - Chaos & Comedy Co.

A high-performance e-commerce website for Samay's comedy merchandise brand, built with Next.js and designed to handle viral traffic.

## 🎭 About the Brand

**Chaos & Comedy Co.** - Merch that's as chaotic and heartful as your life. Designed for people who laugh at their own mess.

### Brand Personality
- **Witty**: Clever, sharp humor that makes people think and laugh
- **Bold**: Unapologetic, confident, in-your-face comedy  
- **Chaotic**: Unpredictable, surprising, delightfully messy
- **Heartful**: Genuine connection, relatable struggles, emotional depth

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### Installation

1. **Clone and setup**
   ```bash
   cd website
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Stripe keys
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## 🛒 Features

### Core E-commerce
- **Product Catalog**: T-shirts, hoodies, enamel pins, caps
- **Shopping Cart**: Real-time cart updates with local storage
- **Checkout**: Stripe integration with ₹1 test payments
- **Order Management**: Order confirmation and tracking

### Performance & Scalability
- **Next.js 14**: App Router, Server Components, Image optimization
- **Responsive Design**: Mobile-first, works on all devices
- **High Traffic Ready**: Optimized for 25-50k visitors/hour
- **Fast Loading**: Optimized images, lazy loading, efficient bundling

### User Experience
- **Smooth Animations**: Framer Motion for delightful interactions
- **Chaos Design**: Glitch effects, animated gradients, playful UI
- **Accessibility**: Keyboard navigation, screen reader friendly
- **SEO Optimized**: Meta tags, structured data, sitemap

## 🎨 Design System

### Colors
```css
--electric-blue: #00BFFF    /* Primary brand color */
--neon-yellow: #FFFF00      /* Chaotic energy */
--deep-purple: #4B0082      /* Comedy club vibes */
--charcoal: #2F2F2F         /* Professional base */
--bright-orange: #FF6347    /* Unexpected fun */
```

### Typography
- **Display**: Bebas Neue (Headers, impact text)
- **Body**: Inter (Clean, readable text)
- **Special**: Chaos text with animated gradients

## 🛍️ Product Line

### T-Shirts (₹799-999)
1. **Professional Chaos**: "I'M NOT MESSY, I'M CREATIVELY ORGANIZED"
2. **Social Media Reality**: "POSTING MY LIFE, PRETENDING IT'S TOGETHER"
3. **Samay Says**: "LIFE'S A JOKE, MIGHT AS WELL GET THE PUNCHLINE RIGHT"
4. **Adulting Chronicles**: "ADULTING LEVEL: STILL GOOGLING HOW TO ADULT"

### Hoodies (₹1499-1999)
1. **Comfort Chaos**: Minimalist design with "COZY CHAOS"
2. **Mood Alignment**: D&D-inspired comedy alignment chart

### Enamel Pins (₹199-299)
1. **Chaos Meter**: Speedometer reading "MAXIMUM CHAOS"
2. **Comedy Mic**: Vintage microphone with "SAMAY SAYS" banner
3. **Scroll & LOL**: Phone with infinite scroll animation
4. **Adulting Error**: "ADULTING.EXE HAS STOPPED WORKING"

### Caps (₹699-899)
1. **Subtle Chaos**: Minimalist "C&C" logo
2. **Statement Cap**: "PROFESSIONALLY CHAOTIC"
3. **Trucker Style**: Mesh design with vintage patch

## 💳 Payment Integration

### Stripe Setup
```javascript
// Test mode configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

// ₹1 test transactions for pre-orders
const session = await stripe.checkout.sessions.create({
  line_items: [{
    price_data: {
      currency: 'inr',
      unit_amount: 100, // ₹1 in paisa
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: '/success',
  cancel_url: '/cancel',
})
```

### Pre-order Strategy
- **₹1 Test Payment**: Validates payment method
- **Full Payment**: Collected on product delivery
- **Early Bird Discount**: 20% off first 100 orders
- **Bundle Deals**: Multi-item discounts

## 📱 Social Media Integration

### Instagram Strategy
- **Handle**: @chaosandcomedyco
- **Content**: Behind-the-scenes, design process, user-generated content
- **Stories**: Daily chaos, product previews, Samay's comedy clips
- **Reels**: Product showcases, comedy content, brand personality

### Viral Marketing
- **Hashtags**: #ChaosAndComedy #OrganizedChaos #SamaySays
- **User Generated**: Encourage customers to share their "chaos"
- **Influencer**: Comedy community partnerships

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables (Production)
```bash
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://chaosandcomedyco.com
NODE_ENV=production
```

## 📊 Analytics & Performance

### Expected Traffic
- **Launch Hour**: 25-50k visitors
- **First 24 Hours**: 5-10 lakh visitors
- **Conversion Goal**: 5-10% pre-order rate

### Performance Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Static generation + ISR
- **CDN**: Vercel Edge Network

### Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Error Tracking**: Sentry integration
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics

## 🎯 Success Metrics

### Traffic Goals
- ✅ 25-50k visitors in first hour
- ✅ 5-10 lakh visitors in 24 hours
- ✅ <2 second page load time
- ✅ 99.9% uptime during viral traffic

### Business Goals
- ✅ 5-10% conversion rate on pre-orders
- ✅ ₹50k+ in pre-orders within 24 hours
- ✅ 10k+ Instagram followers
- ✅ Viral social media sharing

## 🔧 Development

### Project Structure
```
website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & animations
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── success/           # Payment success page
│   └── api/               # API routes
├── public/                # Static assets
├── components/            # Reusable components
└── lib/                   # Utilities & configurations
```

### Key Components
- **ProductCard**: Individual product display
- **ShoppingCart**: Cart sidebar with animations
- **CheckoutFlow**: Stripe payment integration
- **ChaosAnimations**: Brand-specific UI effects

## 🎨 Brand Guidelines

### Voice & Tone
- **Conversational**: Like talking to a friend
- **Self-deprecating**: Laugh at our own chaos
- **Relatable**: Acknowledge the mess of modern life
- **Encouraging**: It's okay to not have it together

### Content Examples
- **Product Descriptions**: Witty, honest, relatable
- **Social Posts**: Behind-the-scenes chaos, honest moments
- **Customer Service**: Helpful but maintain the fun tone
- **Marketing**: Authentic, not trying too hard

## 🤝 Contributing

This is a competition project for Masters' Union. The brand may be launched with the selected team.

### Team Opportunities
- **Selected teams**: Get to work with Samay directly
- **Launch support**: Masters' Union handles inventory
- **Traffic exposure**: Potential 25-50k visitors in first hour

## 📞 Contact

**For this competition submission:**
- **Deadline**: Friday, 7th Nov, 5 PM
- **Results**: Friday, 7 PM
- **Briefing**: Saturday-Sunday (if shortlisted)
- **Launch**: Monday, 10th Nov

**Brand Contact:**
- **Instagram**: @chaosandcomedyco
- **Email**: hello@chaosandcomedyco.com
- **Website**: chaosandcomedyco.com

---

**Made with chaos and coffee ☕ for Masters' Union Samay Cofounder Challenge**