import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TotalYearData } from "@/types/type";

interface Props {
  yearRecord: TotalYearData[];
}

const ProfitTable = ({ yearRecord }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">년차</TableHead>
          <TableHead>최종 금액</TableHead>
          <TableHead>수익률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {yearRecord.map(({ year, totalAmount, rateOfReturn }) => (
          <TableRow key={year}>
            <TableCell>{year}</TableCell>
            <TableCell>{`${totalAmount.toLocaleString()} 원`}</TableCell>
            <TableCell>{`${rateOfReturn.toLocaleString()} %`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProfitTable;
