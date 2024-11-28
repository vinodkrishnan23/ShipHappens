import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Popoverdemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Track Ship</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
        <iframe className="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-apac-ind-blr-hackathon-zucicuu/embed/charts?id=b69a15de-6d76-443d-8726-5415732959fb&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        </div>
      </PopoverContent>
    </Popover>
  )
}
