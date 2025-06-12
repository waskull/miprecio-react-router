import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { EditButton, ModalButton } from "~/components/primaryButton";
import { useFetcher, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GenericError } from "~/interfaces/error";
import { editCompanySchema, type TeditCompanySchema } from "./companySchema";
import type { ICompany } from "./company";

const editCompanyModal = function ({ uid }: { uid: string }) {
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [company, setCompany] = useState<ICompany | null>(null);
    let fetcher = useFetcher();
    const [data, setData] = useState<GenericError | null>(null);
    useEffect(() => {
        const getCategory = async () => {
            const response = await fetch("http://localhost:8000/api/v1/company/" + uid);
            const company = await response.json() as ICompany | null;
            setCompany(company);
            setValue("name", company?.name || "");
            setValue("description", company?.description || "");
        }
        getCategory();
    }, [])
    useEffect(() => {
        setLoading(fetcher.state !== "idle");
        setData(fetcher.data);
        if (fetcher?.data?.success) {
            navigate(".", { replace: true });
            setOpen(false);

        }
    }, [fetcher]);
    const {
        register,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<TeditCompanySchema>({
        resolver: zodResolver(editCompanySchema),
        mode: "all",
    });
    return (
        <div>
            <EditButton size="sm" onClick={() => setOpen(!isOpen)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                </div>
            </EditButton>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Editar Compañia: {company?.name}</strong>
                </ModalHeader>
                <ModalBody>
                    <fetcher.Form method="post" action={`/companies/${uid}`}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pb-2">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Bebidas"
                                    />
                                </div>
                                {errors?.name?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.name?.message}`}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description">Descripción</Label>
                                <div className="mt-1">
                                    <TextInput
                                        {...register("description")}
                                        type="text"
                                        id="description"
                                        name="description"
                                        placeholder="Bebidas"
                                    />
                                </div>
                                {errors?.description?.message && (
                                    <p className="text-red-500 dark:text-red-600">{`${errors?.description?.message}`}</p>
                                )}
                            </div>
                        </div>
                        <ModalFooter className="pt-3 flex justify-end">
                            <ModalButton disabled={!isDirty || !isValid} size="lg" type="submit">
                                Editar compañia
                            </ModalButton>
                        </ModalFooter>
                    </fetcher.Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default editCompanyModal;