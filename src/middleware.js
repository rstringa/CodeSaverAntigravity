import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies, redirect } = context;

    // 1. Definir qué rutas son públicas
    const isPublicPage = url.pathname === "/" ||
        url.pathname === "/login" ||
        url.pathname === "/register" ||
        url.pathname.startsWith("/api/auth") ||
        url.pathname.startsWith("/_image") || // Optimizaciones de Astro
        url.pathname.includes("."); // Archivos estáticos como favicon.svg

    if (isPublicPage) {
        return next();
    }

    // 2. Obtener tokens de las cookies
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    // 3. Si no hay tokens y la página NO es pública, redirigir a la landing
    if (!accessToken || !refreshToken) {
        console.log("No tokens found, redirecting to landing...");
        return redirect("/");
    }

    // 4. Verificar sesión con Supabase
    try {
        const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (error || !data.session) {
            console.log("Invalid session, clearing cookies and redirecting...");
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });
            return redirect("/");
        }

        // Usuario autenticado. Si intenta ir a login/register, al dashboard.
        if (url.pathname === "/login" || url.pathname === "/register") {
            return redirect("/dashboard");
        }
    } catch (e) {
        console.error("Middleware Auth Error:", e);
        return redirect("/");
    }

    return next();
});
