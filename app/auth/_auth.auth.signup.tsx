import {
  Button,
  Checkbox,
  Label,
  Popover,
  TextInput,
} from "flowbite-react";
import { data, redirect, useNavigate } from "react-router";
import { useState } from "react";
import LoadingButton from "../components/loadingButton";
import PrimaryButton from "~/components/primaryButton";
import type { Route } from "./+types/_auth.auth.signup";
import { commitSession, getSession } from "~/sessions.server";
import SignUpForm from "./signForm";
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if (session.has("access_token")) {
    return redirect("/home", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  console.log("no tiene uid");
  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function SignUpPage({ actionData }: Route.ComponentProps) {
  return (
    <SignUpForm actionData={actionData} />
  );
}
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
