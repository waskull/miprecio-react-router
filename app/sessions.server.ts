import { createCookieSessionStorage } from "react-router";

type SessionData = {
    email: string;
    fullname: string;
    role: string;
    access_token: string;
    refresh_token: string
};

type SessionFlashData = {
    error: string;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            // a Cookie from `createCookie` or the CookieOptions to create one
            cookie: {
                name: "authToken",

                // all of these are optional
                // Expires can also be set (although maxAge overrides it when used in combination).
                // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
                //
                // expires: new Date(Date.now() + 60_000),
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                path: "/",
                sameSite: "lax",
                secrets: ["s3cret1"],
                secure: true,
            },
        }
    );

const { getSession: getRefreshSession, commitSession: CommitRefreshSession, destroySession: destroyRefreshSession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            // a Cookie from `createCookie` or the CookieOptions to create one
            cookie: {
                name: "refreshToken",

                // all of these are optional
                // Expires can also be set (although maxAge overrides it when used in combination).
                // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
                //
                // expires: new Date(Date.now() + 60_000),
                httpOnly: true,
                maxAge: 10 * 24 * 60 * 60 * 1000,
                path: "/",
                sameSite: "lax",
                secrets: ["s3cret2"],
                secure: true,
            },
        }
    );

export { getSession, commitSession, destroySession, getRefreshSession, CommitRefreshSession, destroyRefreshSession };