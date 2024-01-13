import { getDailyReceiptInPeriod } from "@/api/get-daily-receipt-in-period"
import { useState } from "react"
import { DateRange } from 'react-day-picker'
import { subDays } from 'date-fns'
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, XCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { violet } from 'tailwindcss/colors'

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts'

import { Button } from "@/components/ui/button"

interface ReceiptDataPerMonth {
    date: string
    receipt: number
}
export interface ReceiptChartProps {
    data: ReceiptDataPerMonth[]
}

function CustomTooltip({
    active,
    payload,
    label,
}: TooltipProps<number, number>) {
    if (active && payload && payload.length) {
        return (
            <div className="flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm">
                <span className="font-semibold">{label}</span>
                <span>-</span>
                <span>
                    {payload[0].value?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </span>
            </div>
        )
    }

    return null
}

export function ReceiptChart() {
    const [period, setPeriod] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    })

    const { data: dailyReceiptInPeriod, isFetching: isLoadingDailyReceiptInPeriod, error: dailyReceiptError } = useQuery({
        retry: false,
        queryKey: ['metrics', 'daily-receipt-in-period', period],
        queryFn: () =>
            getDailyReceiptInPeriod({
                from: period?.from,
                to: period?.to,
            }),
    })

    function handleResetPeriod() {
        setPeriod({
            from: subDays(new Date(), 7),
            to: new Date(),
        })
    }
    return (
        <Card className="col-span-6">
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        Revenue in the period
                        {isLoadingDailyReceiptInPeriod && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                    </CardTitle>
                    <CardDescription>Daily revenue in period</CardDescription>
                </div>

                <div className="flex items-center gap-3">
                    <Label>Period</Label>
                    <DateRangePicker date={period} onDateChange={setPeriod} />
                </div>
            </CardHeader>
            <CardContent>
                {dailyReceiptInPeriod ? (
                    <>
                        {dailyReceiptInPeriod?.length > 0 ? (

                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={dailyReceiptInPeriod} style={{ fontSize: 12 }}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        dy={16}
                                    />

                                    <YAxis
                                        stroke="#888888"
                                        tickLine={false}
                                        axisLine={false}
                                        width={80}
                                        tickFormatter={(value: number) =>
                                            value.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                    />

                                    <CartesianGrid className="!stroke-muted " vertical={false} />

                                    <Line
                                        type="linear"
                                        strokeWidth={2}
                                        dataKey="receipt"
                                        stroke={violet['500']}
                                    />
                                    <Tooltip cursor={true} content={<CustomTooltip />} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                                <span className="text-sm text-muted-foreground">
                                    No result find.
                                </span>
                                <Button
                                    variant="link"

                                    className="text-violet-500 dark:text-violet-400"
                                    onClick={handleResetPeriod}

                                >
                                    Show result within 7 days
                                </Button>
                            </div>
                        )}
                    </>
                ) : dailyReceiptError ? (
                    <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                        <span className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                            <XCircle className="h-4 w-4" />
                            Error to obtain data.
                        </span>
                        <Button
                            variant="link"

                            className="text-violet-500 dark:text-violet-400"
                            onClick={handleResetPeriod}
                        >
                            Reload Graph
                        </Button>
                    </div>
                ) : (
                    <div className="flex h-[240px] w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}