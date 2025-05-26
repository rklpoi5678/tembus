"use client"

import { useState } from "react"
import { Search, Filter, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CategorySearchProps {
  onSearch: (query: string) => void
  onSort: (sort: string) => void
  onFilter: (filter: string) => void
}

export function CategorySearch({ onSearch, onSort, onFilter }: CategorySearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSort("name")}>Name A-Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("name-desc")}>Name Z-A</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("products")}>Most Products</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("products-desc")}>Least Products</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onFilter("all")}>All Categories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilter("popular")}>Popular (100+ products)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilter("new")}>New Categories</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
