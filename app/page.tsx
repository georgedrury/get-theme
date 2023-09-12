import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import { ComboboxDemo } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PageHeader from "@/components/page-header"
import AuthButtonServer from "@/components/auth-button-server"
import Themes from "@/components/themes"

export const dynamic = "force-dynamic"

export default async function Home() {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect("/login")
	}
	return (
		<>
			<PageHeader title="Themes" />
			<div className="space-y-4">
				<Themes />
			</div>
		</>
	)
}
