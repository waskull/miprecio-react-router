import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("./_index.tsx"),
  layout("./auth/_auth.tsx", [
    route("auth/signin", "./auth/_auth.auth.login.tsx"),
    route("auth/signup", "./auth/_auth.auth.signup.tsx"),
    route("auth/logout", "./auth/authLogoutAction.tsx"),
  ]),
  layout("./dashboard/_dashboard.tsx", [
    route("home", "./dashboard/_dashboard.dashboard.tsx"),
    route("companies", "./company/_dashboard.company.tsx"),
    route("companies/:id", "./company/editCompanyAction.tsx"),
    route("companies/delete/:id", "./company/deleteCompanyAction.tsx"),
    route("categories", "./category/_dashboard.category.tsx"),
    route("categories/:id", "./category/editCategoryAction.tsx"),
    route("categories/delete/:id", "./category/deleteCategoryAction.tsx"),
    route("products", "./product/_dashboard.product.tsx"),
    route("products/delete/:id", "./product/deleteProductAction.tsx"),
    route("products/:id", "./product/editProductAction.tsx"),
    route("store", "./store/_dashboard.store.tsx"),
    route("store/:id", "./store/_dashboard.store.$id.tsx"),
    route("users", "./user/_dashboard.user.tsx"),
    route("users/:id", "./user/editUserAction.tsx"),
    route("users/delete/:id", "./user/deleteUserAction.tsx"),
    route("users/getuserinfo", "./user/getUserInfo.tsx"),
  ]),
  route("*", "./404.tsx"),
] satisfies RouteConfig;