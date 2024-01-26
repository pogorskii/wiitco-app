import { Suspense } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DetailsPageH2 } from "@/components/ui/details-page-h2";
import { Skeleton } from "../skeleton";
import { fetchHLTBInfo } from "@/app/video-games/lib/actions";

export async function HLTBTable({ query }: { query: string }) {
  return (
    <Suspense fallback={<Skeleton className="mb-8 h-36 w-full" />}>
      <Content query={query} />
    </Suspense>
  );
}
async function Content({ query }: { query: string }) {
  const hltb = await fetchHLTBInfo({ search: query });
  if (
    !hltb ||
    (!hltb.gameplayCompletionist &&
      !hltb.gameplayMain &&
      !hltb.gameplayMainExtra)
  )
    return;

  return (
    <div className="mb-8">
      <DetailsPageH2>How long is {hltb.name}?</DetailsPageH2>
      <Table>
        <TableBody>
          {hltb.gameplayMain ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">Story</TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayMain} {hltb.gameplayMain <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
          {hltb.gameplayMainExtra ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">
                Story + Extra
              </TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayMainExtra}{" "}
                {hltb.gameplayMainExtra <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
          {hltb.gameplayCompletionist ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">100%</TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayCompletionist}{" "}
                {hltb.gameplayCompletionist <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
