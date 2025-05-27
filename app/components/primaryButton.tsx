import { Button } from "flowbite-react";
import type { IconType } from "react-icons";
import { HiPlus } from "react-icons/hi";

export default function PrimaryButton({
    children,
    size = "md",
    type = "button",
    onClick,
    ...otherProps }: {
        children: React.ReactNode,
        size?: string, 
        type?: "button" | "submit" | "reset",
        onClick: () => Promise<any | void> | void,
        otherProps?: any,
    }) {
    return (
        <Button className="bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-500 dark:focus:bg-gray-100"
            color="gray"
            size={size}
            type={type}
            onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                onClick();
            }}
            {...otherProps}>
            {children}
        </Button>
    );
}

export function ModalButton({
    children,
    size = "md",
    disabled = false,
    type = "button",
    ...otherProps }: {
        children: React.ReactNode,
        size?: string, 
        disabled?: boolean,
        type?: "button" | "submit" | "reset",
        otherProps?: any,
    }) {
    return (
        <Button className="bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-500 dark:focus:bg-gray-100"
            color="gray"
            size={size}
            type={type}
            disabled={disabled}
            {...otherProps}>
            {children}
        </Button>
    );
}


export function EditButton({
    children,
    size = "md",
    onClick,
    ...otherProps }: {
        children: React.ReactNode,
        size?: string, 
        onClick: () => Promise<any | void> | void,
        otherProps?: any
    }) {
    return (
        <Button className="focus:ring-4 bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-400 focus:bg-yellow-400 dark:focus:bg-yellow-400 text-gray-600 dark:text-gray-600 focus:ring-yellow-300 dark:focus:ring-yellow-500"
            color="gray"
            size={size}
            type="button"
            onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                onClick();
            }}
            {...otherProps}>
            {children}
        </Button>
    );
}