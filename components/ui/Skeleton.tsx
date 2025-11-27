import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
    </div>
  )
}

export function ProfilePreviewSkeleton() {
  return (
    <div className="bg-white border-b border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}
