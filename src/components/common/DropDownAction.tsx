import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

interface itemDropDown {
  label: string;
  action: () => void;
}

interface DropDownActionProps {
  items?: itemDropDown[];
}

export const DropDownAction = ({ items }: DropDownActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-black">
        <MoreHorizontalIcon className="text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-wrap max-w-60 mr-8 text-black">
        <DropdownMenuLabel>Acción</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items?.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.action}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
