'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Gamepad2, LogOut, User as UserIcon, Library } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { supabase } from '@/lib/supabase'

export function Header() {
  const { user } = useAuthStore()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tighter">GameVault</span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <Link
              href="/library"
              className="hidden items-center gap-2 rounded-xl px-4 py-2 font-medium transition-colors hover:bg-muted md:flex"
            >
              <Library className="h-5 w-5" />
              My Library
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <UserIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted transition-all active:scale-95"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
