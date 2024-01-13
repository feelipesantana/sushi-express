import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { MonthReceiptCard } from "./MonthReceiptCard";

export function Dashboard() {

    return (

        <div className="flex flex-col gap-4 ">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid grid-cols-4 gap-4">
                <MonthReceiptCard />
                <MonthOrdersAmountCard />
            </div>

        </div>

    )
}