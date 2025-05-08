import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    layout("./routes/_auth.tsx", [
        route("auth/signin", "./routes/_auth.auth.login.tsx"),
        route("auth/signup", "./routes/_auth.auth.signup.tsx"),
      ]),
      layout("./routes/_dashboard.tsx", [
        route("home", "./routes/_dashboard.dashboard.tsx"),
        route("companies", "./routes/_dashboard.company.tsx"),
        route("products", "./routes/_dashboard.product.tsx"),
        route("store", "./routes/_dashboard.store.tsx"),
        route("users", "./routes/_dashboard.user.tsx"),
      ]),
      route("*", "./routes/404.tsx"),
    ] satisfies RouteConfig;