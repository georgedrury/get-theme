import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

interface TokenInputProps {
	tokenName: string
	tokenType: string
	tokenValue: any
}
export default function TokenInput({
	tokenName,
	tokenType,
	tokenValue,
}: TokenInputProps) {
	return (
		<div className="flex gap-4">
			<div className="grid w-full gap-1.5 mb-2">
				<Label htmlFor="text">Name</Label>
				<Input
					type="text"
					id="name"
					placeholder="name"
					name="Name"
					value={tokenName}
				/>
			</div>
			<div className="grid w-full gap-1.5 mb-2">
				<Label htmlFor="text">Type</Label>
				<Select>
					<SelectTrigger className="">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="spacing">Spacing</SelectItem>
						<SelectItem value="radius">Radius</SelectItem>
						<SelectItem value="color">Color</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="grid w-full gap-1.5 mb-2">
				<Label htmlFor="text">Value</Label>
				<Input
					type="text"
					id="name"
					placeholder="name"
					name="Value"
					value={tokenValue}
				/>
			</div>
		</div>
	)
}
