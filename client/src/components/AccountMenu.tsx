import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { motion } from 'framer-motion'
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";

import { SignOut } from "@/api/sign-out";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel
} from "./ui/dropdown-menu";

export function AccountMenu() {
    const navigate = useNavigate()
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
    const { isPending: isSigningOut, mutateAsync: handleSignOut } = useMutation({
        mutationFn: SignOut,
        onSuccess: () => {
            navigate('/sign-in', { replace: true })
        },
    })

    return (
        <motion.div>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex select-none items-center gap-2">
                            {isLoadingManagedRestaurant ? (
                                <Skeleton className="h-4 w-4" />
                            ) : (
                                managedRestaurant?.name
                            )}
                            <ChevronDown className="h4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 mt-6 backdrop:blur-md rounded-md bg-slate-200 p-2 dark:bg-slate-700/20">
                        <DropdownMenuLabel className="flex flex-col">
                            {isLoadingProfile ? (
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            ) : (
                                <>
                                    {profile?.name}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        {profile?.email}
                                    </span>
                                </>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <Building className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut}>
                                <button className="w-full" onClick={() => handleSignOut()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </motion.div>

    )
}