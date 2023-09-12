"use client"

import {
	Session,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"

export default function AuthButtonClient({
	session,
}: {
	session: Session | null
}) {
	const supabase = createClientComponentClient()
	const router = useRouter()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	return session ? (
		<Button variant="outline" size="sm" onClick={handleSignOut}>
			Sign out
		</Button>
	) : (
		<Link href="/login">
			<Button variant="default" size="sm" className="text-sm">
				Sign in
			</Button>
		</Link>
	)
}
