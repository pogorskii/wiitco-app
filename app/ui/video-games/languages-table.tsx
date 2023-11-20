"use client";

import { useState } from "react";

import { FormattedLanguage } from "@/app/lib/zod-schemas";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaCheck } from "react-icons/fa";

export function LanguagesTable({
  languages,
}: {
  languages: FormattedLanguage[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Audio</TableHead>
            <TableHead>Subs</TableHead>
            <TableHead className="text-right">UI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((l, i) => {
            if (isOpen || (!isOpen && i < 3))
              return (
                <TableRow key={i}>
                  <TableCell className="px-0 py-2 font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {" "}
                          <img
                            src={`/flags/${l.id}.svg`}
                            alt={`${l.name} (${l.nativeName})`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{l.name}</p>
                          <p>{l.nativeName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="px-0 py-2">
                    {l.supportType.some((obj) => obj.id === 1) && (
                      <FaCheck className="mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="px-0 py-2">
                    {l.supportType.some((obj) => obj.id === 2) && (
                      <FaCheck className="mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="px-0 py-2">
                    {l.supportType.some((obj) => obj.id === 3) && (
                      <FaCheck className="mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      {languages.length > 3 && (
        <Button variant="link" onClick={handleClick} className="px-0 py-1">
          {isOpen ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
}
