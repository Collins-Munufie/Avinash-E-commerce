# AvinashMarket - Premium E-Commerce Store

A modern, production-ready e-commerce website built with clean HTML, CSS, and JavaScript. Features a professional UI/UX, responsive design, smooth animations, and full shopping cart functionality.

## Features

### Shopping Experience
- **Homepage** - Hero banner, featured products, categories, flash deals, testimonials
- **Product Catalog** - Full shop page with filtering, sorting, search, and pagination
- **Product Details** - Image gallery with zoom, color/quantity selectors, reviews, related products
- **Shopping Cart** - Item management, quantity controls, coupon codes, order summary
- **Checkout Flow** - Multi-step checkout with address, payment, and order review
- **Wishlist** - Save favorite items, move to cart
- **Order Tracking** - Real-time order status with progress timeline

### Pages
- Home, Shop, Product Detail, Cart, Checkout
- Login / Register, Wishlist, Order Tracking
- Contact Us (with FAQ accordion), About Us

### UI/UX
- Fully responsive (mobile, tablet, desktop)
- Smooth CSS animations and transitions
- Product image zoom on hover
- Toast notifications for user actions
- Mobile slide-out navigation
- Back-to-top button
- Sticky header with scroll effects

### Technical
- **localStorage** persistence for cart and wishlist
- **SEO optimized** - Meta tags, Open Graph, semantic HTML
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Performance** - Lazy loading images, CSS variables, optimized assets
- **Docker ready** - Nginx-based container with gzip compression
- **AWS deployable** - Terraform infrastructure as code

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (variables, grid, flexbox, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.4.0 |
| Fonts | Google Fonts (Inter) |
| Container | Docker (Nginx Alpine) |
| Infra | Terraform + AWS EC2 |

## Project Structure

```
Avinash-E-commerce/
├── app/
│   ├── css/
│   │   ├── base.css          # Design system, variables, utilities
│   │   └── components.css    # All component and page styles
│   ├── js/
│   │   ├── app.js            # Main application (cart, wishlist, UI)
│   │   └── products.js       # Product data and helper functions
│   ├── images/               # Local images (logo, etc.)
│   ├── index.html            # Homepage
│   ├── shop.html             # Product catalog with filters
│   ├── product.html          # Product detail page
│   ├── cart.html             # Shopping cart
│   ├── checkout.html         # Checkout flow
│   ├── login.html            # Sign in
│   ├── register.html         # Create account
│   ├── wishlist.html         # Saved items
│   ├── order-tracking.html   # Track order status
│   ├── contact.html          # Contact form + FAQ
│   └── about.html            # About the company
├── terraform/                # AWS infrastructure
├── Dockerfile                # Nginx container
├── nginx.conf                # Nginx configuration
└── README.md
```

## Getting Started

### Local Development
```bash
git clone https://github.com/Collins-Munufie/Avinash-E-commerce.git
cd Avinash-E-commerce
```
Open `app/index.html` in your browser, or use Live Server (port 5501).

### Docker
```bash
docker build -t avinashmarket .
docker run -p 8080:80 avinashmarket
```
Visit `http://localhost:8080`

### AWS Deployment
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Design System

- **Primary Color**: `#2563eb` (Blue)
- **Secondary**: `#0f172a` (Slate)
- **Accent**: `#f59e0b` (Amber)
- **Font**: Inter (300-800 weights)
- **Breakpoints**: 1024px, 768px, 480px

## Author

Collins Munufie
