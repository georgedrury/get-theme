import { Button } from "./ui/button"

interface PageHeaderProps {
	title?: string
	back?: boolean
	description?: string
}

export default function PageHeader({
	title,
	back,
	description,
}: PageHeaderProps) {
	return (
		<div className="max-w-[1200px] w-full flex flex-col gap-4 mb-12">
			<div className="flex justify-between w-full items-center">
				<div className="flex gap-3 items-center">
					{back && (
						<div className="w-10 h-10 border border-zinc-200 rounded-sm flex justify-center items-center">
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M16.9883 7H4.78828L10.3883 1.4L8.98828 0L0.988281 8L8.98828 16L10.3883 14.6L4.78828 9H16.9883V7Z"
									fill="#1E212A"
								/>
							</svg>
						</div>
					)}
					<h1 className="text-3xl font-[600_!important]">{title}</h1>
				</div>
				<Button size="sm">Action</Button>
			</div>
			<div className="leading-normal text-zinc-500">{description}</div>
		</div>
	)
}
