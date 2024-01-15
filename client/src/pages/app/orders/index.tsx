import { getOrders } from "@/api/get-orders"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

export function Orders() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const pageIndex = z.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result, isFetching: isFetchingOrders, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', customerName, orderId, status, pageIndex],
        queryFn: () => {
            getOrders({
                pageIndex,
                customerName,
                orderId,
                status: status === "all" ? null : status
            })
        }
    })


    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                Orders
                {isFetchingOrders && (
                    <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
            </h1>
            <div className="space-y-2.5">

                <div className="rounded-md-border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Identifier</TableHead>
                                <TableHead className="w-[180px]">Done in</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead className="w-[140px]">Orders Total</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </div>
            </div>
        </div>
    )
}