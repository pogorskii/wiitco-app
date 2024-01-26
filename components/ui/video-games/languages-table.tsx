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
import { DetailsPageH2 } from "../details-page-h2";

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

  if (!languageSupports.length) return null;

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
                e.language.id === language.id && e.supportType.name === "Audio",
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
          <TableCell className="px-0 py-2">
            {languageSupports.some(
              (e) =>
                e.language.id === language.id &&
                e.supportType.name === "Subtitles",
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
          <TableCell className="px-0 py-2">
            {languageSupports.some(
              (e) =>
                e.language.id === language.id &&
                e.supportType.name === "Interface",
            ) && <FaCheck className="mx-auto" />}
          </TableCell>
        </TableRow>
      );
  });

  return (
    <div className="mb-8 w-full self-start">
      <DetailsPageH2>Supported Languages</DetailsPageH2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-8 px-1 text-start"></TableHead>
            <TableHead className="h-8 px-1 text-start">Audio</TableHead>
            <TableHead className="h-8 px-1 text-start">Subs</TableHead>
            <TableHead className="h-8 px-1 text-start">UI</TableHead>
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
