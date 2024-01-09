import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col text-center">
        <h2 className="mb-4 text-6xl">Page Not Found</h2>
        <p className="mb-6">
          The page you are looking for doesn't exist or has been moved
        </p>
        <Button variant="secondary">
          <Link href="/" className="">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}