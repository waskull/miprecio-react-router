import { Button, Modal, ModalHeader, ModalBody, Spinner } from "flowbite-react";
import { type JSX, useState } from "react";
import { HiTrash, HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteModal({ deleteFunc, title = "Borrar Registro", desc = "Deseas borrar este registro?" }: { deleteFunc: () => void, title: string, desc: string }): JSX.Element {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div>
            <Button size="sm" color="red" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />

                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <ModalHeader className="px-4 pt-2 pb-2">
                    <span className="sr-only">{title}</span>
                </ModalHeader>
                <ModalBody className="px-6 pt-0 pb-4">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500 dark:text-gray-200">
                            {loading ? "Borrando..." : desc}
                        </p>
                        <div className="flex items-center gap-x-3">
                            {!loading ? (
                                <Button color="red" className="w-24" onClick={async () => {
                                    try {
                                        setLoading(true);
                                        await deleteFunc();
                                        setOpen(false);
                                        setLoading(false);
                                    }
                                    catch (e) {
                                        console.log(e);
                                        setLoading(false);
                                    }
                                }
                                }>
                                    Si
                                </Button>
                            ) : (
                                <Button color="transparent" size="md"><Spinner size="md" color="success" aria-label="Success spinner example" /></Button>
                            )
                            }
                            {!loading && <Button color="gray" onClick={() => setOpen(false)}>
                                No
                            </Button>}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};