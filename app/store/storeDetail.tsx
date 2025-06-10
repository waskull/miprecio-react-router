import { EditButton } from "~/components/primaryButton";
import type { ICompanyStore, IStore } from "./store";
import DeleteModal from "~/components/DeleteModal";
import { HiOutlinePencilAlt } from "react-icons/hi";
import AddStoreProductModal from "./addStoreProductModal";
import { useNavigate } from "react-router";

export default function StoreDetail({ data }: { data: ICompanyStore }) {
    const navigate = useNavigate();
    return (
        <section className="bg-gray-50 px-8 antialiased dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Productos</h2>
                    {/* aca irian los botones de filtrado  */}
                    <AddStoreProductModal />
                </div>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {data.store.map((s: IStore) => (
                        <div key={s.product.uid} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="h-56 w-full">
                                <a href="#">
                                    <img className="mx-auto h-full dark:hidden" src="/favicon.ico" alt="" />
                                    <img className="mx-auto hidden h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                                </a>
                            </div>
                            <div className="pt-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> {s.discount}% de descuento </span>

                                    <div className="flex items-center justify-end gap-1">
                                        <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only"> Quick look </span>
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>

                                        <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <span className="sr-only"> Agregar a favoritos </span>
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                            </svg>
                                        </button>
                                        <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                            Agregar a favoritos
                                            <div className="tooltip-arrow" data-popper-arrow=""></div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{s.product.name}</a>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>

                                        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>

                                        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>

                                        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>

                                        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>
                                    </div>

                                    <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                                </div>

                                <ul className="mt-2 flex items-center gap-4">
                                    <li className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{s.product.description}</p>
                                    </li>
                                </ul>

                                <p className="flex mt-2 text-lg font-semibold text-gray-500 dark:text-gray-100 line-through">{s.price} Bs</p>

                                <div className="mt-2 flex items-center justify-between gap-2">
                                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{(s.price) - ((s.discount / 100) * s.price)} Bs</p>

                                    <div className="flex items-center gap-x-2">
                                        <EditButton size="sm" onClick={() => { }}>
                                            <div className="flex items-center gap-x-2">
                                                <HiOutlinePencilAlt className="text-lg" />
                                            </div>
                                        </EditButton>
                                        <DeleteModal title={`Borrar producto de la tienda`} desc={`¿Estas seguro de que deseas quitar ${s.product.name} de esta tienda?`} deleteFunc={async () => {
                                            await fetch(`products/delete/${s.product.uid}`, { method: "POST" });
                                            navigate('.', { replace: true });
                                        }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full text-center">
                    <button type="button" className="rounded-lg border mb-4 border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Mostrar mas</button>
                </div>
            </div>

        </section>
    );
}