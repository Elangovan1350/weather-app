"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Half1Icon } from "@radix-ui/react-icons";

export function PaginationDemo({ number }: { number: number }) {
  console.log(number);

  return (
    <Pagination className="h-48">
      <PaginationContent>
        {number > 0 ? (
          <PaginationItem>
            <PaginationPrevious href={`/weather/${number - 1}`} />
          </PaginationItem>
        ) : null}
        {number >= 2 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {number >= 1 ? (
          <PaginationItem>
            <PaginationLink href={`/weather/${number - 1}`}>
              {number - 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationLink href={`/weather/${number}`} isActive>
            {number}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/weather/${number + 1}`}>
            {number + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`/weather/${number + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
