export interface User {
    id: string
    email: string
    name: string
    role: "admin" | "seller" | "customer"
    avatar?: string
    emailVerified: boolean
    createdAt: string
    updatedAt: string
    // Seller specific fields
    storeName?: string
    storeDescription?: string
    storeUrl?: string
    verified?: boolean
    // Customer specific fields
    address?: Address
    phone?: string
  }
  
  export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    shortDescription: string
    price: number
    originalPrice?: number
    images: ProductImage[]
    category: string
    subcategory?: string
    tags: string[]
    sellerId: string
    seller: User
    inventory: number
    sku: string
    status: "active" | "inactive" | "draft"
    featured: boolean
    digital: boolean
    downloadUrl?: string
    fileSize?: string
    specifications?: Record<string, string>
    rating: number
    reviewCount: number
    salesCount: number
    createdAt: string
    updatedAt: string
  }
  
  export interface ProductImage {
    id: string
    url: string
    alt: string
    isPrimary: boolean
    sortOrder: number
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image?: string
    parentId?: string
    children?: Category[]
    productCount: number
  }
  
  export interface CartItem {
    id: string
    productId: string
    product: Product
    quantity: number
    price: number
    userId: string
    createdAt: string
  }
  
  export interface Order {
    id: string
    orderNumber: string
    userId: string
    user: User
    items: OrderItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
    paymentStatus: "pending" | "paid" | "failed" | "refunded"
    paymentMethod: string
    shippingAddress: Address
    billingAddress: Address
    trackingNumber?: string
    notes?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface OrderItem {
    id: string
    orderId: string
    productId: string
    product: Product
    quantity: number
    price: number
    total: number
  }
  
  export interface Review {
    id: string
    productId: string
    userId: string
    user: User
    rating: number
    title: string
    comment: string
    verified: boolean
    helpful: number
    createdAt: string
    updatedAt: string
  }
  
  export interface Analytics {
    totalSales: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
    revenueGrowth: number
    orderGrowth: number
    topProducts: Product[]
    recentOrders: Order[]
    salesByCategory: { category: string; sales: number }[]
    salesByMonth: { month: string; sales: number }[]
  }
  