"use client";

import { useState } from "react";
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

type LanguageSupports = {
  language: {
    id: number;
    name: string;
    nativeName: string;
    locale: string;
    updatedAt: Date;
    checksum: string;
  };
  supportType: {
    id: number;
    name: string;
    updatedAt: Date;
    checksum: string;
  };
}[];

export function LanguagesTable({
  languageSupports,
}: {
  languageSupports: LanguageSupports;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const languages: {
    id: number;
    name: string;
    nativeName: string;
    locale: string;
    updatedAt: Date;
    checksum: string;
  }[] = [];

  for (const languageSupport of languageSupports) {
    if (!languages.find((l) => l.id === languageSupport.language.id)) {
      languages.push(languageSupport.language);
    }
  }

  const tableRows = Array.from(languages).map((language, i) => {
    if (isOpen || (!isOpen && i < 3))
      return (
        <TableRow key={i}>
          <TableCell className="px-0 py-2 font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <img
                    className="max-w-[35px]"
                    src={`/flags/${language.id}.svg`}
                    alt={`${language.name} (${language.nativeName})`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language.name}</p>
                  <p>{language.nativeName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell className="px-0 py-2">
            {languageSupports.some(
              (e) =>
                e.language.id === language.id && e.supportType.name === "Audio"
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
          <TableCell className="px-0 py-2">
            {languageSupports.some(
              (e) =>
                e.language.id === language.id &&
                e.supportType.name === "Subtitles"
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
          <TableCell className="px-0 py-2">
            {languageSupports.some(
              (e) =>
                e.language.id === language.id &&
                e.supportType.name === "Interface"
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
        </TableRow>
      );
  });

  return (
    <div className="mb-8 self-start w-full">
      <h2 className="mb-2 font-semibold text-lg text-start">
        Supported Languages
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start h-8 px-1"></TableHead>
            <TableHead className="text-start h-8 px-1">Audio</TableHead>
            <TableHead className="text-start h-8 px-1">Subs</TableHead>
            <TableHead className="text-start h-8 px-1">UI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
      {languages.length > 3 && (
        <Button variant="link" onClick={handleClick} className="px-0 py-1">
          {isOpen ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}
