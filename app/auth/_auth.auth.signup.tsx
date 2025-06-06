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
import SignUpForm from "./signForm";

export default function SignUpPage({ actionData }: Route.ComponentProps) {
  return (
    <SignUpForm actionData={actionData} />
  );
}