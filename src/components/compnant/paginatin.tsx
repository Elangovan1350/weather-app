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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export function PaginationDemo({ number }: { number: number }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  function handleSubmit() {
    // Validate input
    if (inputValue >= 0 && inputValue <= 99) {
      // Redirect if input is valid
      setInputValue(0);
      router.push(`/weather/${inputValue}`);
      // Handle redirect failure

      // Clear input field
    } else {
      // Handle invalid input
      console.error("Invalid input");
      setInputValue(0);
      setError(true);
    }
  }

  return (
    <div className="mb-10">
      <Pagination className="h-20 mb-3">
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
            <PaginationLink isActive>{number}</PaginationLink>
          </PaginationItem>
          {number < 99 ? (
            <PaginationItem>
              <PaginationLink href={`/weather/${number + 1}`}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null}
          {number < 98 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}
          {number < 99 ? (
            <PaginationItem>
              <PaginationNext href={`/weather/${number + 1}`} />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
      <div className=" flex justify-center items-center gap-x-4">
        <Input
          type="number"
          max={99}
          min={0}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="w-60"
        />
        <Button variant={"outline"} onClick={handleSubmit}>
          Go
        </Button>
      </div>
      <p className="text-center text-red-600">
        {error ? "Invalid Input ! write 0 to 99 page" : null}
      </p>
    </div>
  );
}
