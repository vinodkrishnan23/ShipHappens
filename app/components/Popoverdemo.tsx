import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Popoverdemo({booking}:{booking: object}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Track Ship</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
        <iframe className="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src={`https://charts.mongodb.com/charts-apac-ind-blr-hackathon-zucicuu/embed/dashboards?id=a98e1742-994c-4fc0-9e2d-2c91fb2ed177&filter={"ship_name":"${booking.shipDetails.shipName}"}`}></iframe>
        </div>
      </PopoverContent>
    </Popover>
  )
}
