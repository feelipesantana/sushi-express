import { Separator } from "@radix-ui/react-separator";
import { Fish, Home, UtensilsCrossed } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { AccountMenu } from "./AccountMenu";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <Fish className="h-6 w-6" />
                <Separator orientation="vertical" className="h-6" />
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to="/" className="flex items-center gap-2 transition duration-200 hover:brightness-75">
                        <Home className="h-4 w-4" />
                        Start
                    </NavLink>
                    <NavLink to="/orders" className="flex items-center gap-2 transition duration-200 hover:brightness-75">
                        <UtensilsCrossed className="h-4 w-4" />
                        Orders
                    </NavLink>
                </nav>
                <div className="ml-auto flex items-center space-x-2">
                    <ModeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}