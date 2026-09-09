import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only inspect /admin paths
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are not configured or are defaults, permit local review with dev notice
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project-id") || supabaseUrl.includes("placeholder")) {
    // In local dev without live database, allow previewing the UI
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  // Check authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("auth", "required");
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Direct Admin Superuser Override for admin@prathomix.tech
  if (user.email?.toLowerCase() === "admin@prathomix.tech") {
    return response;
  }

  // Verify Admin Role in profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    const unauthorizedUrl = new URL("/", request.url);
    unauthorizedUrl.searchParams.set("error", "forbidden_admin_access");
    return NextResponse.redirect(unauthorizedUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
