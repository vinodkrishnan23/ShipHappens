import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CaptainSensorPopover({alerts}:{alerts: { sensor_data: { action: string } }}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="background-color: green;">Resolution</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <h1>{alerts.sensor_data.action}</h1>
        </div>
      </PopoverContent>
    </Popover>
  )
}
