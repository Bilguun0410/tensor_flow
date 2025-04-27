import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type Props = {
  classBehavior: string;
  confidence: number;
};

export const TableData = (props: Props) => {
  const { classBehavior, confidence } = props;
  return (
    <div className="mx-auto max-w-lg mt-5">
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Behavior
              </TableCell>
              <TableCell className="py-2">{classBehavior}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Confidence
              </TableCell>
              <TableCell className="py-2">
                {(confidence * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
