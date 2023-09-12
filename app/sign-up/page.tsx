import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card"
import { ComboboxDemo } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SignUp() {
	return (
		<div className="max-w-xl w-[420px] mx-auto">
			<Card>
				<CardContent className="my-2">
					<CardTitle className="mb-4 flex gap-2 items-center">
						Get started{" "}
						<Badge variant="outline" className="font-normal tracking-normal">
							lol
						</Badge>
					</CardTitle>
					<CardDescription className="my-2">Sign up now</CardDescription>
					<form
						action="/auth/login"
						method="post"
						className="mt-8 flex flex-col gap-4"
					>
						<div className="grid w-full gap-1.5 mb-2">
							<Label htmlFor="email">Email</Label>
							<Input type="email" id="email" placeholder="Email" name="email" />
						</div>
						<div className="grid w-full gap-1.5 mb-2">
							<Label htmlFor="email">Password</Label>
							<Input
								type="password"
								id="password"
								placeholder="Password"
								name="password"
								pattern=".{6},}"
							/>
						</div>
						<Button formAction="/auth/sign-up">Sign up</Button>
					</form>
					{/* <form action="/auth/login" method="post">
						<label htmlFor="email">Email</label>
						<input name="email" />
						<label htmlFor="password">Password</label>
						<input type="password" name="password" />
						<button>Sign In</button>
						<button formAction="/auth/sign-up">Sign Up</button>
					</form> */}
					<CardFooter className="justify-center mt-8 p-0">
						<p className="text-sm text-zinc-500 text-center">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-zinc-900 hover:text-zinc-500 transition"
							>
								Login
							</Link>
						</p>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	)
}
