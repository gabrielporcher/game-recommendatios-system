'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Gamepad2, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setError('Check your email for the confirmation link.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-10 shadow-2xl ring-1 ring-border">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Gamepad2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">GameVault</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl bg-muted px-4 py-3 outline-none ring-primary/20 transition-all focus:ring-4"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-xl bg-muted px-4 py-3 outline-none ring-primary/20 transition-all focus:ring-4"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 font-bold transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
