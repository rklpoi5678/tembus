"use client"

import { useState } from "react"
import { Briefcase, Users, Heart, Search, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const benefits = [
    {
      icon: Heart,
      title: "건강한 워라밸",
      description: "유연근무제, 재택근무 지원"
    },
    {
      icon: Users,
      title: "성장 기회",
      description: "교육비 지원, 컨퍼런스 참가"
    },
    {
      icon: Briefcase,
      title: "복리후생",
      description: "4대보험, 퇴직금, 경조사비"
    }
  ]

  const jobs = [
    {
      id: 1,
      title: "프론트엔드 개발자",
      department: "개발",
      type: "정규직",
      location: "서울 강남구",
      experience: "3년 이상",
      skills: ["React", "TypeScript", "Next.js"],
      description: "사용자 경험을 중시하는 프론트엔드 개발자를 찾습니다.",
      posted: "2024-01-15"
    },
    {
      id: 2,
      title: "백엔드 개발자",
      department: "개발",
      type: "정규직",
      location: "서울 강남구",
      experience: "5년 이상",
      skills: ["Node.js", "Python", "AWS"],
      description: "확장 가능한 백엔드 시스템을 구축할 개발자를 모집합니다.",
      posted: "2024-01-12"
    },
    {
      id: 3,
      title: "UI/UX 디자이너",
      department: "디자인",
      type: "정규직",
      location: "서울 강남구",
      experience: "3년 이상",
      skills: ["Figma", "Sketch", "Prototyping"],
      description: "사용자 중심의 디자인을 만들어갈 디자이너를 찾습니다.",
      posted: "2024-01-10"
    },
    {
      id: 4,
      title: "마케팅 매니저",
      department: "마케팅",
      type: "정규직",
      location: "서울 강남구",
      experience: "4년 이상",
      skills: ["디지털마케팅", "데이터분석", "SNS"],
      description: "브랜드 성장을 이끌어갈 마케팅 전문가를 모집합니다.",
      posted: "2024-01-08"
    },
    {
      id: 5,
      title: "데이터 분석가",
      department: "개발",
      type: "계약직",
      location: "서울 강남구",
      experience: "2년 이상",
      skills: ["Python", "SQL", "Tableau"],
      description: "비즈니스 인사이트를 도출할 데이터 분석가를 찾습니다.",
      posted: "2024-01-05"
    },
    {
      id: 6,
      title: "고객지원 담당자",
      department: "고객지원",
      type: "정규직",
      location: "서울 강남구",
      experience: "신입 가능",
      skills: ["고객응대", "문제해결", "커뮤니케이션"],
      description: "고객 만족을 위해 최선을 다할 담당자를 모집합니다.",
      posted: "2024-01-03"
    }
  ]

  // 필터링된 채용 정보
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    const matchesType = selectedType === "all" || job.type === selectedType

    return matchesSearch && matchesDepartment && matchesType
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">함께 성장할 인재를 찾습니다</h1>
        <p className="text-lg text-gray-600">혁신적인 기술과 창의적인 아이디어로 미래를 만들어갈 동료를 기다립니다.</p>
      </div>

      {/* 복리후생 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <benefit.icon className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="직무, 기술 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 부서</SelectItem>
            <SelectItem value="개발">개발</SelectItem>
            <SelectItem value="디자인">디자인</SelectItem>
            <SelectItem value="마케팅">마케팅</SelectItem>
            <SelectItem value="고객지원">고객지원</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="고용형태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="정규직">정규직</SelectItem>
            <SelectItem value="계약직">계약직</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 채용 목록 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {job.posted}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="font-medium">경력:</span> {job.experience}
              </div>
              <Button>지원하기</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 결과가 없을 때 */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 조건에 맞는 채용 정보가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
