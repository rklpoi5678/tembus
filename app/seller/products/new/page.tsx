"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SellerLayout } from "@/components/seller/seller-layout"
import {
  Upload,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ImageIcon,
  FileText,
  DollarSign,
  Settings,
  Globe,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductFormData {
  name: string
  description: string
  shortDescription: string
  price: string
  compareAtPrice: string
  category: string
  subcategory: string
  tags: string[]
  images: File[]
  files: File[]
  productType: "digital" | "physical" | "service"
  isPublished: boolean
  allowRatings: boolean
  requiresShipping: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  seoTitle: string
  seoDescription: string
  customUrl: string
}

const categories = [
  { value: "games", label: "Games", subcategories: ["PC Games", "Mobile Games", "Game Assets", "Game Mods"] },
  { value: "software", label: "Software", subcategories: ["Productivity", "Design Tools", "Development", "Utilities"] },
  { value: "music", label: "Music", subcategories: ["Beats", "Samples", "Full Tracks", "Sound Effects"] },
  {
    value: "mobile-apps",
    label: "Mobile Apps",
    subcategories: ["iOS Apps", "Android Apps", "App Templates", "UI Kits"],
  },
  { value: "design", label: "Design", subcategories: ["Graphics", "Templates", "Fonts", "Icons"] },
  { value: "education", label: "Education", subcategories: ["Courses", "Ebooks", "Tutorials", "Worksheets"] },
]

const steps = [
  { id: "basic", title: "Basic Info", icon: FileText },
  { id: "media", title: "Media & Files", icon: ImageIcon },
  { id: "pricing", title: "Pricing", icon: DollarSign },
  { id: "settings", title: "Settings", icon: Settings },
  { id: "seo", title: "SEO & Publishing", icon: Globe },
]

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    compareAtPrice: "",
    category: "",
    subcategory: "",
    tags: [],
    images: [],
    files: [],
    productType: "digital",
    isPublished: false,
    allowRatings: true,
    requiresShipping: false,
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    seoTitle: "",
    seoDescription: "",
    customUrl: "",
  })

  const [newTag, setNewTag] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDimensionChange = (dimension: keyof ProductFormData["dimensions"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const handleFileUpload = (files: FileList | null, type: "images" | "files") => {
    if (!files) return

    const fileArray = Array.from(files)
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ...fileArray] }))
  }

  const removeFile = (index: number, type: "images" | "files") => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, type: "images" | "files") => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, type)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Info
        return !!(formData.name && formData.description && formData.category)
      case 1: // Media & Files
        return formData.images.length > 0
      case 2: // Pricing
        return !!formData.price
      case 3: // Settings
        return true
      case 4: // SEO & Publishing
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Product created successfully!",
        description: "Your product has been added to your store.",
      })

      router.push("/seller/products")
    } catch (error) {
      toast({
        title: "Error creating product",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCategory = categories.find((cat) => cat.value === formData.category)

  return (
    <SellerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Product</h1>
            <p className="text-gray-400 mt-2">Add a new product to your store</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Progress */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-300">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${index <= currentStep ? "text-pink-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-pink-500 text-white"
                        : index === currentStep
                          ? "bg-pink-500 text-white"
                          : "bg-gray-600 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? <CheckCircle className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter product name"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-gray-300">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCategory && (
                      <div>
                        <Label htmlFor="subcategory" className="text-gray-300">
                          Subcategory
                        </Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => handleInputChange("subcategory", value)}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {selectedCategory.subcategories.map((sub) => (
                              <SelectItem key={sub} value={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <Label htmlFor="shortDescription" className="text-gray-300">
                        Short Description
                      </Label>
                      <Input
                        id="shortDescription"
                        value={formData.shortDescription}
                        onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                        placeholder="Brief description for listings"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="description" className="text-gray-300">
                        Full Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Detailed product description"
                        rows={6}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-gray-300">Product Type</Label>
                      <RadioGroup
                        value={formData.productType}
                        onValueChange={(value) => handleInputChange("productType", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="digital" id="digital" />
                          <Label htmlFor="digital" className="text-gray-300">
                            Digital Product
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="physical" id="physical" />
                          <Label htmlFor="physical" className="text-gray-300">
                            Physical Product
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="service" id="service" />
                          <Label htmlFor="service" className="text-gray-300">
                            Service
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-gray-300">Tags</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          className="bg-gray-700 border-gray-600 text-white"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button onClick={addTag} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-600 text-gray-200">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Media & Files</h3>

                  {/* Product Images */}
                  <div className="mb-8">
                    <Label className="text-gray-300 text-lg">Product Images *</Label>
                    <p className="text-gray-400 text-sm mb-4">
                      Upload high-quality images of your product. The first image will be used as the main thumbnail.
                    </p>

                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive ? "border-pink-400 bg-pink-400/10" : "border-gray-600 hover:border-gray-500"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, "images")}
                    >
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB each</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files, "images")}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Choose Files
                      </Button>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeFile(index, "images")}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && <Badge className="absolute bottom-2 left-2 bg-pink-500">Main</Badge>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Files */}
                  <div>
                    <Label className="text-gray-300 text-lg">Product Files</Label>
                    <p className="text-gray-400 text-sm mb-4">
                      Upload the actual product files that customers will download.
                    </p>

                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive ? "border-pink-400 bg-pink-400/10" : "border-gray-600 hover:border-gray-500"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, "files")}
                    >
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-gray-500 text-sm">Any file type up to 100MB each</p>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files, "files")}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Choose Files
                      </Button>
                    </div>

                    {formData.files.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index, "files")}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="price" className="text-gray-300">
                        Price *
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="0.00"
                          className="bg-gray-700 border-gray-600 text-white pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="compareAtPrice" className="text-gray-300">
                        Compare at Price
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="compareAtPrice"
                          type="number"
                          step="0.01"
                          value={formData.compareAtPrice}
                          onChange={(e) => handleInputChange("compareAtPrice", e.target.value)}
                          placeholder="0.00"
                          className="bg-gray-700 border-gray-600 text-white pl-10"
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Show customers the original price</p>
                    </div>
                  </div>

                  {formData.productType === "physical" && (
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-white mb-4">Shipping Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="weight" className="text-gray-300">
                            Weight (lbs)
                          </Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                            placeholder="0.0"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div className="md:col-span-1">
                          <Label className="text-gray-300">Dimensions (inches)</Label>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.length}
                              onChange={(e) => handleDimensionChange("length", e.target.value)}
                              placeholder="L"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.width}
                              onChange={(e) => handleDimensionChange("width", e.target.value)}
                              placeholder="W"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.height}
                              onChange={(e) => handleDimensionChange("height", e.target.value)}
                              placeholder="H"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Product Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowRatings"
                        checked={formData.allowRatings}
                        onCheckedChange={(checked) => handleInputChange("allowRatings", checked)}
                      />
                      <Label htmlFor="allowRatings" className="text-gray-300">
                        Allow customer ratings and reviews
                      </Label>
                    </div>

                    {formData.productType === "physical" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requiresShipping"
                          checked={formData.requiresShipping}
                          onCheckedChange={(checked) => handleInputChange("requiresShipping", checked)}
                        />
                        <Label htmlFor="requiresShipping" className="text-gray-300">
                          This product requires shipping
                        </Label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">SEO & Publishing</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="seoTitle" className="text-gray-300">
                        SEO Title
                      </Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                        placeholder="SEO optimized title"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="seoDescription" className="text-gray-300">
                        SEO Description
                      </Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                        placeholder="SEO meta description"
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customUrl" className="text-gray-300">
                        Custom URL
                      </Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400 text-sm">
                          yourstore.com/products/
                        </span>
                        <Input
                          id="customUrl"
                          value={formData.customUrl}
                          onChange={(e) => handleInputChange("customUrl", e.target.value)}
                          placeholder="custom-product-url"
                          className="bg-gray-700 border-gray-600 text-white rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                      />
                      <Label htmlFor="isPublished" className="text-gray-300">
                        Publish this product immediately
                      </Label>
                    </div>

                    {!formData.isPublished && (
                      <Alert className="bg-yellow-500/10 border-yellow-500/20">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <AlertDescription className="text-yellow-200">
                          This product will be saved as a draft and won't be visible to customers until published.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/seller/products")}>
              Save as Draft
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}
