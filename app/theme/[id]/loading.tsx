import { Skeleton } from "@/components/ui/skeleton"

interface LoadingProps {
	className?: string
}

export default function Loading({ className }: LoadingProps) {
	// You can add any UI inside Loading, including a Skeleton.
	return <Skeleton className={className} />
}
