import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./MonthCanceledOrdersAmountCard copy";
import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { MonthReceiptCard } from "./MonthReceiptCard";
import { PopularProductsChart } from "./PopularProductsChart";
import { ReceiptChart } from "./ReceiptChart";

export function Dashboard() {

    return (

        <div className="flex flex-col gap-4 ">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid grid-cols-4 gap-4">
                <MonthReceiptCard />
                <MonthOrdersAmountCard />
                <DayOrdersAmountCard />
                <MonthCanceledOrdersAmountCard />
            </div>
            <div className="grid grid-cols-9 gap-4">
                <ReceiptChart />
                <PopularProductsChart />
            </div>

        </div>

    )
}