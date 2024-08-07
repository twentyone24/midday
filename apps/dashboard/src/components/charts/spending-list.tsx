import { getSpending } from "@midday/supabase/cached-queries";
import { Skeleton } from "@midday/ui/skeleton";
import { cookies } from "next/headers";
import { spendingData } from "./data";
import { SpendingCategoryList } from "./spending-category-list";

export function SpendingListSkeleton() {
  return (
    <div className="mt-8 space-y-4">
      {[...Array(16)].map((_, index) => (
        <div
          key={index.toString()}
          className="flex justify-between px-3 items-center"
        >
          <div className="w-[70%] flex space-x-4 pr-8 items-center">
            <Skeleton className="rounded-[2px] size-[12px]" />
            <Skeleton className="h-[6px] w-full rounded-none" />
          </div>
          <div className="w-full ml-auto">
            <Skeleton className="w-full align-start h-[6px] rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

const BASE_CURRENCY = "SEK";

export async function SpendingList({ initialPeriod, disabled }) {
  const spending = disabled
    ? spendingData
    : await getSpending({ ...initialPeriod, currency: BASE_CURRENCY });

  if (!spending?.data?.length) {
    return (
      <div className="flex items-center justify-center aspect-square">
        <p className="text-sm text-[#606060]">
          No transactions have been categorized yet.
        </p>
      </div>
    );
  }

  return (
    <SpendingCategoryList categories={spending?.data} period={initialPeriod} />
  );
}
