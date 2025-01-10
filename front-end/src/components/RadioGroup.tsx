import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
 
interface Props {
    onStatusChange: (value: string) => void;
}

export function RadioGroupStatus({ onStatusChange }: Props) {
    return (
        <RadioGroup defaultValue="" className="flex items-center gap-7" onValueChange={onStatusChange}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all" className=" cursor-pointer" />
                <Label htmlFor="all" className="cursor-pointer">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Activo" id="activos" className="text-green-700 cursor-pointer"/>
                <Label htmlFor="activos" className="text-green-700 cursor-pointer">Activos</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Inactivo" id="inactivos" className="text-red-700 cursor-pointer"/>
                <Label htmlFor="inactivos" className="text-red-700 cursor-pointer">Inactivos</Label>
            </div>
        </RadioGroup>
    );
}