import { createClient } from "@supabase/supabase-js";
import { useAsync } from "./useAsync";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export function useAsyncSupabase(
  supabaseMethod: (...args: any[]) => Promise<any>
) {
  return useAsync(() => supabaseMethod(), false);
}
