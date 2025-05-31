import { Decimal } from "@prisma/client/runtime/library"

  export interface User {
    id: string
    email: string
    name?: string
    role: UserRole
    avatar?: string
    verified?: boolean
    address?: any // Json type in Prisma
    phone?: string
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
    
    // Relations
    seller?: any
    auth?: any
    sessions?: any[]
    cart_items?: any[]
    orders?: any[]
    reviews?: any[]
    wishlists?: any[]
  }

  export interface Seller {
    id: string
    user_id: string
    user?: User
    storeName: string | null
    slug: string | null
    storeDescription: string | null
    logo_url: string | null
    banner_url: string | null
    verified: boolean
    status: SellerStatus
    created_at: Date
    updated_at: Date
  }
  
  export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  export interface Product {
    id: number
    name: string
    shortDescription: string
    description?: string
    
    type: ProductType
    status: ProductStatus
    
    price: Decimal
    original_price?: Decimal
    currency: string
    
    stock_quantity: number
    is_active: boolean
    
    image_url?: string
    digital_file_url?: string
    download_url?: string
    file_size?: string
    
    created_at: Date
    updated_at: Date
    
    rating: Decimal
    review_count: number
    sales_count: number
    
    featured: boolean
    
    inventory?: any
    specifications?: any
    
    // 관계 필드
    category_id?: number
    seller_id: string
    
    categories?: Category
    seller: Seller
    
    tags: string[]
    product_images: ProductImage[]
    reviews: Review[]
  }
  
  export interface ProductImage {
    id: number                
    product_id: number        
    image_url: string         
    alt_text?: string        
    is_primary: boolean      
    sort_order: number       
    created_at: Date         
    
    // Relation
    product: Product
  }
  
  export interface Category {
    id: number                
    name: string           
    description?: string    
    icon?: string          
    slug: string         
    parentId?: number      
    product_count: number  
    created_at?: Date      
    updated_at?: Date      
    
    // Relation
    parent?: Category      
    children?: Category[]  
    products?: Product[]
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
    id: number                    // Int -> number
    user_id: string              // String @db.Uuid -> string
    product_id: number           // Int -> number
    rating: number               // Int -> number (1-5 범위)
    title?: string              // String? -> optional string
    comment?: string            // String? -> optional string
    is_verified_purchase: boolean // Boolean -> boolean
    helpful_count: number        // Int -> number
    created_at?: Date           // DateTime? -> optional Date
    updated_at?: Date           // DateTime? -> optional Date
    
    // Relations
    product: Product
    user: User
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
  
  export enum SellerStatus {
    pending = 'pending',
    active = 'active',
    suspended = 'suspended',
    deactivated = 'deactivated'
  }

  export enum ProductType {
    digital = 'digital',
    service = 'service',
    physical = 'physical'
  }
  
  export enum ProductStatus {
    draft = 'draft',
    published = 'published',
    archived = 'archived'
  }
  
  export enum UserRole {
    buyer = 'buyer',
    seller = 'seller',
    admin = 'admin'
  }
  