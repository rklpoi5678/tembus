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
  BanknoteIcon,
  Banknote,
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
  { value: "games", label: "게임", subcategories: ["PC 게임", "모바일 게임", "게임 에셋", "게임 모드"] },
  { value: "software", label: "소프트웨어", subcategories: ["생산성", "디자인 도구", "개발", "유틸리티"] },
  { value: "music", label: "음악", subcategories: ["비트", "샘플", "완성곡", "효과음"] },
  {
    value: "mobile-apps", 
    label: "모바일 앱",
    subcategories: ["iOS 앱", "안드로이드 앱", "앱 템플릿", "UI 키트"],
  },
  { value: "design", label: "디자인", subcategories: ["그래픽", "템플릿", "폰트", "아이콘"] },
  { value: "education", label: "교육", subcategories: ["강좌", "전자책", "튜토리얼", "워크시트"] },
]

const steps = [
  { id: "basic", title: "기본 정보", icon: FileText },
  { id: "media", title: "미디어 및 파일", icon: ImageIcon },
  { id: "pricing", title: "가격", icon: DollarSign },
  { id: "settings", title: "설정", icon: Settings },
  { id: "seo", title: "SEO 및 출판", icon: Globe },
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
        {/* 헤더 섹션 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">새 상품 등록</h1>
            <p className="text-gray-600 mt-2">스토어에 새 상품을 추가하세요</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
        </div>

        {/* 진행 상태 표시 */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                단계 {currentStep + 1} / {steps.length}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% 완료</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-blue-500 text-white"
                        : index === currentStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-400"
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

        {/* 폼 컨텐츠 */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            {/* 기본 정보 입력 단계 */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="name" className="text-gray-700">
                        상품명 *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="상품명을 입력하세요"
                        className="bg-white border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-gray-700">
                        카테고리 *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
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
                        <Label htmlFor="subcategory" className="text-gray-700">
                          하위 카테고리
                        </Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => handleInputChange("subcategory", value)}
                        >
                          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                            <SelectValue placeholder="하위 카테고리 선택" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
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
                      <Label htmlFor="shortDescription" className="text-gray-700">
                        간단 설명
                      </Label>
                      <Input
                        id="shortDescription"
                        value={formData.shortDescription}
                        onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                        placeholder="목록에 표시될 간단한 설명"
                        className="bg-white border-gray-300 text-gray-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="description" className="text-gray-700">
                        상세 설명 *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="상품에 대한 자세한 설명"
                        rows={6}
                        className="bg-white border-gray-300 text-gray-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-gray-700">상품 유형</Label>
                      <RadioGroup
                        value={formData.productType}
                        onValueChange={(value) => handleInputChange("productType", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="digital" id="digital" />
                          <Label htmlFor="digital" className="text-gray-700">
                            디지털 상품
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="physical" id="physical" />
                          <Label htmlFor="physical" className="text-gray-700">
                            실물 상품
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="service" id="service" />
                          <Label htmlFor="service" className="text-gray-700">
                            서비스
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-gray-700">태그</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="태그 추가"
                          className="bg-white border-gray-300 text-gray-900"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button onClick={addTag} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500">
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

            {/* 미디어 및 파일 업로드 단계 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">미디어 및 파일</h3>

                  {/* 상품 이미지 업로드 */}
                  <div className="mb-8">
                    <Label className="text-gray-300 text-lg">상품 이미지 *</Label>
                    <p className="text-gray-400 text-sm mb-4">
                      상품의 고품질 이미지를 업로드하세요. 첫 번째 이미지가 대표 이미지로 사용됩니다.
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
                      <p className="text-gray-300 mb-2">이미지를 드래그하여 놓거나 클릭하여 선택하세요</p>
                      <p className="text-gray-500 text-sm">PNG, JPG, GIF (최대 10MB)</p>
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
                        파일 선택
                      </Button>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`상품 이미지 ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeFile(index, "images")}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && <Badge className="absolute bottom-2 left-2 bg-pink-500">대표</Badge>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 상품 파일 업로드 */}
                  <div>
                    <Label className="text-gray-300 text-lg">상품 파일</Label>
                    <p className="text-gray-400 text-sm mb-4">
                      고객이 다운로드할 실제 상품 파일을 업로드하세요.
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
                      <p className="text-gray-300 mb-2">파일을 드래그하여 놓거나 클릭하여 선택하세요</p>
                      <p className="text-gray-500 text-sm">모든 파일 형식 (최대 100MB)</p>
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
                        파일 선택
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

            {/* 가격 설정 단계 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">가격 설정</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="price" className="text-gray-700">
                        판매가 *
                      </Label>
                      <div className="relative">
                        <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="0.00"
                          className="bg-white border-gray-200 text-gray-900 pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="compareAtPrice" className="text-gray-700">
                        정상가
                      </Label>
                      <div className="relative">
                        <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="compareAtPrice"
                          type="number"
                          step="0.01"
                          value={formData.compareAtPrice}
                          onChange={(e) => handleInputChange("compareAtPrice", e.target.value)}
                          placeholder="0.00"
                          className="bg-white border-gray-200 text-gray-900 pl-10"
                        />
                      </div>
                      <p className="text-gray-600 text-sm mt-1">고객에게 표시될 원래 가격</p>
                    </div>
                  </div>

                  {formData.productType === "physical" && (
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">배송 정보</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="weight" className="text-gray-700">
                            무게 (lbs)
                          </Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                            placeholder="0.0"
                            className="bg-white border-gray-200 text-gray-900"
                          />
                        </div>

                        <div className="md:col-span-1">
                          <Label className="text-gray-700">크기 (inches)</Label>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.length}
                              onChange={(e) => handleDimensionChange("length", e.target.value)}
                              placeholder="길이"
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.width}
                              onChange={(e) => handleDimensionChange("width", e.target.value)}
                              placeholder="너비"
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              type="number"
                              step="0.1"
                              value={formData.dimensions.height}
                              onChange={(e) => handleDimensionChange("height", e.target.value)}
                              placeholder="높이"
                              className="bg-white border-gray-200 text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 상품 설정 단계 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">상품 설정</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowRatings"
                        checked={formData.allowRatings}
                        onCheckedChange={(checked) => handleInputChange("allowRatings", checked)}
                        className="border-gray-300"
                      />
                      <Label htmlFor="allowRatings" className="text-gray-700">
                        고객 평점 및 리뷰 허용
                      </Label>
                    </div>

                    {formData.productType === "physical" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requiresShipping"
                          checked={formData.requiresShipping}
                          onCheckedChange={(checked) => handleInputChange("requiresShipping", checked)}
                          className="border-gray-300"
                        />
                        <Label htmlFor="requiresShipping" className="text-gray-700">
                          이 상품은 배송이 필요합니다
                        </Label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SEO 및 출판 단계 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO 및 출판</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="seoTitle" className="text-gray-700">
                        SEO 제목
                      </Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                        placeholder="SEO 최적화된 제목"
                        className="bg-white border-gray-200 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="seoDescription" className="text-gray-700">
                        SEO 설명
                      </Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                        placeholder="SEO 메타 설명"
                        rows={3}
                        className="bg-white border-gray-200 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customUrl" className="text-gray-700">
                        사용자 정의 URL
                      </Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-600 text-sm">
                          yourstore.com/products/
                        </span>
                        <Input
                          id="customUrl"
                          value={formData.customUrl}
                          onChange={(e) => handleInputChange("customUrl", e.target.value)}
                          placeholder="custom-product-url"
                          className="bg-white border-gray-200 text-gray-900 rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                        className="border-gray-300"
                      />
                      <Label htmlFor="isPublished" className="text-gray-700">
                        이 상품을 즉시 공개
                      </Label>
                    </div>

                    {!formData.isPublished && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <AlertDescription className="text-amber-800">
                          이 상품은 임시저장되며 공개되기 전까지 고객에게 보이지 않습니다.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 네비게이션 버튼 */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/seller/products")}>
              임시저장
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "생성 중..." : "상품 등록"}
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                다음
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}
