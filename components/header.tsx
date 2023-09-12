import Link from "next/link"
import Navbar from "./navbar"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButtonClient from "./auth-button-client"
import AuthButtonServer from "./auth-button-server"

export const dynamic = "force-dynamic"

export default async function Header() {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<div className="mt-8 flex justify-center items-center relative my-2 max-w-[960px] mx-auto w-full py-8 px-8 bg-zinc-50 rounded-md">
			<div className="absolute left-8 font-semibold text-xl">
				<Link href="/">
					<span className="border border-zinc-700 py-0.5 px-2 text-xl rounded-sm -tracking-wide mr-1">
						GET
					</span>
					Theme
				</Link>
			</div>
			{/* <Navbar /> */}
			<div className="absolute right-8 font-black uppercase">
				<AuthButtonClient session={session} />
			</div>
		</div>
	)
}
