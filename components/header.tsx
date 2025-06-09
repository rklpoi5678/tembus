"use client"

import Link from "next/link"
import { Menu, Search, Store, Package, Settings, LogOut, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartIcon } from "@/components/cart-icon"
// import { useAuth } from "@/lib/auth-context"
import { useUser, useAuth, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs" // Import from Clerk
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function Header() {
  // Clerk's useUser hook provides the authenticated user object and its loading state
  const { isSignedIn, user, isLoaded } = useUser();
  // Clerk's useAuth hook provides session management functions like signOut
  const { signOut } = useAuth();
  const router = useRouter(); // For navigating after logout

  // Instead of your custom `loading`, Clerk provides `isLoaded` for `useUser`
  // `isLoaded` is true when Clerk has finished attempting to load the user (either signed in or out)

  const handleLogout = async () => {
    await signOut(); // Clerk's signOut function
    router.push('/'); // Redirect to home or login page after logout
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 ml-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">자유템</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              카테고리
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              베스트
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              이벤트
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="상품을 검색하세요..." className="pl-10 w-64" />
            </div>
          </div>
          <CartIcon />

          {/* Clerk's way of handling signed in/out states */}
          {!isLoaded ? ( // Show nothing or a loading spinner until Clerk is loaded
            <div>로딩 중...</div>
          ) : (
            <>
              {isSignedIn ? ( // If the user is signed in
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* Clerk's user object has different properties, check Clerk docs for exact names */}
                    {/* user.fullName or user.emailAddresses[0].emailAddress */}
                    <DropdownMenuLabel>{user?.fullName || user?.emailAddresses?.[0]?.emailAddress}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* You'll need to get the role information from Clerk's user metadata or publicMetadata */}
                    {/* Assuming you store role in publicMetadata */}
                    {(user?.publicMetadata?.role === "seller" || user?.publicMetadata?.role === "admin") && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/seller">
                            <span className="flex items-center"> {/* Add flex for alignment if needed */}
                              <Store className="mr-2 h-4 w-4" />
                              내 상점
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/products">
                            <span className="flex items-center"> {/* Add flex for alignment if needed */}
                              <Package className="mr-2 h-4 w-4" />
                              상품 관리
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <span className="flex items-center"> {/* Add flex for alignment if needed */}
                          <Settings className="mr-2 h-4 w-4" />
                          설정
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}> {/* Use your handleLogout function */}
                      <LogOut className="mr-2 h-4 w-4" />
                      <SignOutButton>
                        로그아웃
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : ( // If the user is signed out
                <div className="flex items-center gap-2">
                  {/* Clerk's built-in components for sign-in/sign-up */}
                  <SignInButton mode="modal" >
                    <Button>로그인</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-secondary text-secondary-foreground">회원가입</Button>
                  </SignUpButton>
                </div>
              )}
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}