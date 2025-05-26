import type { Category } from "./types"

export const categoriesData: Category[] = [
  {
    id: "1",
    name: "Games",
    slug: "games",
    description: "Discover amazing games, from indie gems to AAA titles, game assets, and gaming tools.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 1247,
    children: [
      { id: "1-1", name: "Indie Games", slug: "indie-games", productCount: 456, parentId: "1" },
      { id: "1-2", name: "Game Assets", slug: "game-assets", productCount: 321, parentId: "1" },
      { id: "1-3", name: "Game Tools", slug: "game-tools", productCount: 189, parentId: "1" },
      { id: "1-4", name: "Mobile Games", slug: "mobile-games", productCount: 281, parentId: "1" },
    ],
  },
  {
    id: "2",
    name: "Software",
    slug: "software",
    description: "Professional software, productivity tools, and applications for every need.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 892,
    children: [
      { id: "2-1", name: "Productivity", slug: "productivity", productCount: 234, parentId: "2" },
      { id: "2-2", name: "Design Tools", slug: "design-tools", productCount: 198, parentId: "2" },
      { id: "2-3", name: "Developer Tools", slug: "developer-tools", productCount: 156, parentId: "2" },
      { id: "2-4", name: "Business Software", slug: "business-software", productCount: 304, parentId: "2" },
    ],
  },
  {
    id: "3",
    name: "Music & Audio",
    slug: "music",
    description: "Music tracks, sound effects, audio samples, and music production tools.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 634,
    children: [
      { id: "3-1", name: "Music Tracks", slug: "music-tracks", productCount: 287, parentId: "3" },
      { id: "3-2", name: "Sound Effects", slug: "sound-effects", productCount: 156, parentId: "3" },
      { id: "3-3", name: "Audio Samples", slug: "audio-samples", productCount: 123, parentId: "3" },
      { id: "3-4", name: "Music Software", slug: "music-software", productCount: 68, parentId: "3" },
    ],
  },
  {
    id: "4",
    name: "Mobile Apps",
    slug: "mobile-apps",
    description: "Mobile applications, app templates, and mobile development resources.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 445,
    children: [
      { id: "4-1", name: "iOS Apps", slug: "ios-apps", productCount: 198, parentId: "4" },
      { id: "4-2", name: "Android Apps", slug: "android-apps", productCount: 167, parentId: "4" },
      { id: "4-3", name: "App Templates", slug: "app-templates", productCount: 80, parentId: "4" },
    ],
  },
  {
    id: "5",
    name: "Digital Art",
    slug: "digital-art",
    description: "Digital artwork, illustrations, graphics, and creative assets.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 756,
    children: [
      { id: "5-1", name: "Illustrations", slug: "illustrations", productCount: 234, parentId: "5" },
      { id: "5-2", name: "Graphics", slug: "graphics", productCount: 189, parentId: "5" },
      { id: "5-3", name: "Icons", slug: "icons", productCount: 167, parentId: "5" },
      { id: "5-4", name: "Templates", slug: "templates", productCount: 166, parentId: "5" },
    ],
  },
  {
    id: "6",
    name: "Education",
    slug: "education",
    description: "Educational content, courses, tutorials, and learning materials.",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 523,
    children: [
      { id: "6-1", name: "Online Courses", slug: "online-courses", productCount: 198, parentId: "6" },
      { id: "6-2", name: "E-books", slug: "ebooks", productCount: 156, parentId: "6" },
      { id: "6-3", name: "Tutorials", slug: "tutorials", productCount: 123, parentId: "6" },
      { id: "6-4", name: "Study Materials", slug: "study-materials", productCount: 46, parentId: "6" },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.find((category) => category.slug === slug)
}

export function getAllCategories(): Category[] {
  return categoriesData
}

export function getSubcategories(parentId: string): Category[] {
  const parent = categoriesData.find((cat) => cat.id === parentId)
  return parent?.children || []
}
