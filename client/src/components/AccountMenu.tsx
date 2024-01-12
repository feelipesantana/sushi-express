import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";
import { Skeleton } from "./ui/skeleton";
import { ChevronDown } from "lucide-react";

export function AccountMenu() {

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['me'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })


    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex select-none items-center gap-2">
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className="h-4 w-4" />
                        ) : (
                            managedRestaurant?.id
                        )}
                        <ChevronDown className="h4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </Dialog>
    )
}