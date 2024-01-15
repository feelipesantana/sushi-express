import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export function OrderTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger>
                        <Button>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Order Details</span>
                        </Button>
                    </DialogTrigger>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}