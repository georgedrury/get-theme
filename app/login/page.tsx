import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
// import AuthForm from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import AuthButtonServer from "@/components/auth-button-server"

export const dynamic = "force-dynamic"

export default async function Login() {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		redirect("/")
	}

	return (
		<div className="max-w-xl w-[420px] mx-auto">
			<Card>
				<CardContent className="my-2">
					<CardTitle className="mb-4 flex gap-2 items-center">
						Welcome back
					</CardTitle>
					<CardDescription className="my-2">
						Sign in to continue your theming adventure
					</CardDescription>
					<form method="post">
						<div className="mt-8 flex flex-col gap-4">
							<div className="grid w-full gap-1.5 mb-2">
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									placeholder="Email"
									name="email"
								/>
							</div>
							<div className="grid w-full gap-1.5 mb-2">
								<Label htmlFor="email">Password</Label>
								<Input
									type="password"
									id="password"
									placeholder="Password"
									name="password"
								/>
							</div>
							<Button formAction="/auth/login">Sign in</Button>
						</div>
					</form>
					{/* <CardFooter className="justify-center mt-8 p-0">
						<p className="text-sm text-zinc-500 text-center">
							<span>Don&apos;t have an account</span>
							<Link
								href="/sign-up"
								className="text-zinc-900 hover:text-zinc-500 transition"
							>
								Sign up
							</Link>
						</p>
					</CardFooter> */}
				</CardContent>
			</Card>
		</div>
	)
}
