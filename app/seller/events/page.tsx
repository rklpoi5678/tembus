"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Plus,
  Users,
  MapPin,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share,
  Eye,
  Settings,
  Ticket,
  TrendingUp,
  UserCheck,
  DollarSign,
} from "lucide-react"
import { SellerLayout } from "@/components/seller/seller-layout"

interface Event {
  id: string
  title: string
  description: string
  type: "webinar" | "workshop" | "launch" | "sale" | "meetup"
  status: "draft" | "published" | "live" | "completed" | "cancelled"
  startDate: string
  endDate: string
  location: string
  isVirtual: boolean
  maxAttendees?: number
  currentAttendees: number
  ticketPrice: number
  isFree: boolean
  coverImage?: string
  tags: string[]
  createdAt: string
}

const eventTypes = [
  { value: "webinar", label: "웨비나" },
  { value: "workshop", label: "워크숍" },
  { value: "launch", label: "제품 출시" },
  { value: "sale", label: "세일 이벤트" },
  { value: "meetup", label: "밋업" },
]

const statusLabels: Record<string, string> = {
  draft: "임시저장",
  published: "공개됨",
  live: "진행중",
  completed: "완료",
  cancelled: "취소됨",
}

type EventType = "webinar" | "workshop" | "launch" | "sale" | "meetup"

export default function SellerEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Omit<Partial<Event>, "type"> & { type: EventType }>({
    title: "",
    description: "",
    type: "webinar",
    startDate: "",
    endDate: "",
    location: "",
    isVirtual: true,
    maxAttendees: 100,
    ticketPrice: 0,
    isFree: true,
    tags: [],
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setTimeout(() => {
      setEvents([
        {
          id: "1",
          title: "신제품 런칭 웨비나",
          description: "신제품 라인업을 소개하는 온라인 웨비나입니다.",
          type: "launch",
          status: "published",
          startDate: "2024-02-15T14:00:00Z",
          endDate: "2024-02-15T15:30:00Z",
          location: "온라인",
          isVirtual: true,
          maxAttendees: 500,
          currentAttendees: 234,
          ticketPrice: 0,
          isFree: true,
          tags: ["런칭", "제품", "웨비나"],
          createdAt: "2024-01-20",
        },
        {
          id: "2",
          title: "디자인 워크숍",
          description: "고급 디자인 기법과 실무 노하우를 배우는 워크숍입니다.",
          type: "workshop",
          status: "live",
          startDate: "2024-01-25T10:00:00Z",
          endDate: "2024-01-25T16:00:00Z",
          location: "서울 강남구",
          isVirtual: false,
          maxAttendees: 50,
          currentAttendees: 45,
          ticketPrice: 99000,
          isFree: false,
          tags: ["디자인", "워크숍", "교육"],
          createdAt: "2024-01-10",
        },
        {
          id: "3",
          title: "플래시 세일 이벤트",
          description: "24시간 한정 최대 70% 할인 세일 이벤트!",
          type: "sale",
          status: "completed",
          startDate: "2024-01-20T00:00:00Z",
          endDate: "2024-01-21T00:00:00Z",
          location: "온라인 스토어",
          isVirtual: true,
          currentAttendees: 1250,
          ticketPrice: 0,
          isFree: true,
          tags: ["세일", "할인", "한정"],
          createdAt: "2024-01-15",
        },
      ])
      setLoading(false)
    }, 500)
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.startDate) return
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description || "",
      type: newEvent.type as any,
      status: "draft",
      startDate: newEvent.startDate!,
      endDate: newEvent.endDate || newEvent.startDate!,
      location: newEvent.location || (newEvent.isVirtual ? "온라인" : ""),
      isVirtual: newEvent.isVirtual!,
      maxAttendees: newEvent.maxAttendees,
      currentAttendees: 0,
      ticketPrice: newEvent.isFree ? 0 : newEvent.ticketPrice || 0,
      isFree: newEvent.isFree!,
      tags: newEvent.tags || [],
      createdAt: new Date().toISOString().split("T")[0],
    }
    setEvents([event, ...events])
    setCreateDialogOpen(false)
    setNewEvent({
      title: "",
      description: "",
      type: "webinar",
      startDate: "",
      endDate: "",
      location: "",
      isVirtual: true,
      maxAttendees: 100,
      ticketPrice: 0,
      isFree: true,
      tags: [],
    })
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시${date.getMinutes().toString().padStart(2, "0")}분`
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">이벤트 관리</h1>
            <p className="text-gray-600 dark:text-gray-400">이벤트를 생성하고 관리하세요</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                새 이벤트 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>이벤트 생성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">이벤트명</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="이벤트명을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="type">이벤트 유형</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={value => setNewEvent({ ...newEvent, type: value as EventType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="이벤트 설명을 입력하세요"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">시작일시</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={newEvent.startDate}
                      onChange={e => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">종료일시</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={newEvent.endDate}
                      onChange={e => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isVirtual"
                    checked={newEvent.isVirtual}
                    onChange={e => setNewEvent({ ...newEvent, isVirtual: e.target.checked })}
                  />
                  <Label htmlFor="isVirtual">온라인 이벤트</Label>
                </div>
                {!newEvent.isVirtual && (
                  <div>
                    <Label htmlFor="location">장소</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="이벤트 장소를 입력하세요"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxAttendees">최대 인원</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={newEvent.maxAttendees}
                      onChange={e => setNewEvent({ ...newEvent, maxAttendees: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        id="isFree"
                        checked={newEvent.isFree}
                        onChange={e => setNewEvent({ ...newEvent, isFree: e.target.checked })}
                      />
                      <Label htmlFor="isFree">무료 이벤트</Label>
                    </div>
                    {!newEvent.isFree && (
                      <Input
                        type="number"
                        value={newEvent.ticketPrice}
                        onChange={e => setNewEvent({ ...newEvent, ticketPrice: Number(e.target.value) })}
                        placeholder="티켓 가격(원)"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)} type="button">
                    취소
                  </Button>
                  <Button onClick={handleCreateEvent} type="button" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    생성
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 이벤트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 py-12">불러오는 중...</div>
          ) : events.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">등록된 이벤트가 없습니다.</div>
          ) : (
            events.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white text-lg">{event.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gray-600 text-white text-xs">{statusLabels[event.status]}</Badge>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 text-xs">
                          {eventTypes.find(t => t.value === event.type)?.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.currentAttendees}명 참석
                      {event.maxAttendees && ` / 최대 ${event.maxAttendees}명`}
                    </span>
                  </div>
                  {!event.isFree && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                      <Ticket className="h-4 w-4" />
                      <span>{event.ticketPrice.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> 삭제
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </SellerLayout>
  )
}
