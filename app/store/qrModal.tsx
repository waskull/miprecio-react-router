import { Modal, ModalHeader, ModalBody, Label, TextInput, ModalFooter, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsQrCodeScan } from "react-icons/bs";
import QRCode from "react-qr-code";
import apiURL from "~/apiURL";
import type { IProduct } from "~/product/product";
export default function QrCodeModal({ uid, product }: { uid: string, product: IProduct }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    async function loadData() {
        const data = await fetch(`${apiURL}/store/`);
        const json = await data.json();
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <button onClick={() => {
                setOpen(true);
            }} type="button" className="show sm:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only"> Ver </span>
                <BsQrCodeScan className="h-5 w-5" aria-hidden="true" />
            </button>
            <Modal size="lg" className="backdrop-blur-xs" onClose={() => setOpen(false)} show={isOpen}>
                 <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong className="mx-auto">Codigo QR de {product.name}</strong>
                </ModalHeader> 
                <ModalBody>
                    {/*   <fetcher.Form method="post" action="/products"> */}
                        <QRCode
                            size={256}
                            className="mx-auto"
                            style={{ height: "90%", maxWidth: "90%", width: "90%" }}
                            value={JSON.stringify({uid:uid, product_uid: product.uid})}
                            viewBox={`0 0 256 256`}
                        />
                   
                    {/*  </fetcher.Form> */}
                </ModalBody>
            </Modal>
        </div>
    );
}