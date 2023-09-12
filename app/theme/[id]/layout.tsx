import PageHeader from "@/components/page-header"
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ThemeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="">
			<section className="">{children}</section>
		</div>
	)
}
