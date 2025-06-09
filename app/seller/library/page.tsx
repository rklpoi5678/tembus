"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Folder, File, Image, Video, Music, Upload, Search, Download, Trash2 } from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const files = [
    {
      id: "1",
      name: "디지털 아트 팩.zip",
      type: "archive",
      size: "245MB",
      lastModified: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "UI 키트 프로.psd",
      type: "image",
      size: "156MB",
      lastModified: "2024-01-10",
      status: "active",
    },
    {
      id: "3",
      name: "프로모션 영상.mp4",
      type: "video",
      size: "1.2GB",
      lastModified: "2024-01-05",
      status: "active",
    },
    {
      id: "4",
      name: "배경 음악.mp3",
      type: "audio",
      size: "8.5MB",
      lastModified: "2024-01-01",
      status: "active",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "archive":
        return <Folder className="h-5 w-5 text-orange-500" />
      case "image":
        return <Image className="h-5 w-5 text-blue-500" />
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />
      case "audio":
        return <Music className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getFileType = (type: string) => {
    switch (type) {
      case "archive":
        return "압축파일"
      case "image":
        return "이미지"
      case "video":
        return "비디오"
      case "audio":
        return "오디오"
      default:
        return "기타"
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">자산 관리</h1>
            <p className="text-gray-600 dark:text-gray-400">디지털 자산과 파일을 관리하세요</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
            <Upload className="mr-2 h-4 w-4" />
            파일 업로드
          </Button>
        </div>

        {/* 검색 및 필터 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="파일 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="images">이미지</TabsTrigger>
                  <TabsTrigger value="videos">비디오</TabsTrigger>
                  <TabsTrigger value="audio">오디오</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* 파일 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>파일 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>파일명</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>크기</TableHead>
                  <TableHead>수정일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span className="font-medium text-gray-900 dark:text-white">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getFileType(file.type)}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.lastModified}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">활성</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 저장 공간 사용량 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">총 저장 공간</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">10GB</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">사용 중</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2GB</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">남은 공간</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6.8GB</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
