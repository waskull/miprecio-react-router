import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("./_index.tsx"),
    layout("./auth/_auth.tsx", [
        route("auth/signin", "./auth/_auth.auth.login.tsx"),
        route("auth/signup", "./auth/_auth.auth.signup.tsx"),
      ]),
      layout("./dashboard/_dashboard.tsx", [
        route("home", "./dashboard/_dashboard.dashboard.tsx"),
        route("companies", "./company/_dashboard.company.tsx"),
        route("categories", "./category/_dashboard.category.tsx"),
        route("products", "./product/_dashboard.product.tsx"),
        route("store", "./store/_dashboard.store.tsx"),
        route("store/:id", "./store/_dashboard.store.$id.tsx"),
        route("users", "./user/_dashboard.user.tsx"),
      ]),
      route("*", "./404.tsx"),
    ] satisfies RouteConfig;