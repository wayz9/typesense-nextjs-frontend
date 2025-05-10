import { FACET_FIELD_LABELS } from "@/lib/data/config";
import { getMovies } from "@/lib/data/movies";
import { toURLSearchParams } from "@/lib/utils";
import StarsBackground from "@/ui/components/stars-background";
import FacetFilter from "@/ui/filters/facet-filter";
import QueryMode from "@/ui/filters/query-mode";
import Rating from "@/ui/filters/rating";
import Search from "@/ui/filters/search";
import SortBy from "@/ui/filters/sort-by";
import InfoModal from "@/ui/info-modal";
import Results from "@/ui/results";
import { IconRefresh } from "@tabler/icons-react";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  let params = toURLSearchParams(await searchParams);
  let { movies, facets, found } = await getMovies(params);

  return (
    <>
      <main className="relative z-10 flex px-6 flex-1 w-full max-w-7xl gap-4 mx-auto">
        <aside className="hidden md:block sticky self-start top-0 py-4 w-70 pr-6 h-screen overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
          <h2 className="text-lg font-medium tracking-tight text-white">
            Filters
          </h2>

          <div className="mt-5 space-y-8 w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <Search delay={75} className="w-full" />
                <QueryMode />
              </div>
              <SortBy />
            </div>

            <Rating />

            {facets.map((facet) => (
              <FacetFilter
                key={facet.field_name}
                queryKey={facet.field_name}
                options={facet.counts}
                //@ts-expect-error The labels aren't stongly defined (yet??)...
                title={FACET_FIELD_LABELS[facet.field_name] ?? facet.field_name}
                hits={facet.stats.total_values}
              />
            ))}
          </div>
        </aside>

        <section className="relative flex-1 pt-4 [--offset:--spacing(14)] pb-(--offset)">
          <div className="flex items-center justify-between">
            <h3 className="font-medium tracking-tight text-white">
              {Number(found).toLocaleString("en-US")} hits
            </h3>

            <Link
              href="/"
              scroll={false}
              className="flex items-center gap-x-2 text-sm font-semibold"
            >
              <IconRefresh className="text-zinc-400 size-[18px]" />
              <span className="text-zinc-100">Reset filters</span>
            </Link>
          </div>

          <Results movies={movies} total={found} />
        </section>

        <InfoModal />
      </main>
      <StarsBackground
        starColor="#facc15"
        className="fixed bottom-0 inset-x-0 h-[95vh] mask-radial mask-radial-from-0%"
      />
    </>
  );
}
