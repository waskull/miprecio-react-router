import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Accordion, AccordionContent, AccordionPanel, AccordionTitle, Card } from "flowbite-react";
import { useState, type JSX } from "react";
import { Link } from "react-router";
import DeleteModal from "~/components/DeleteModal";
import type { ICompanyStore } from "~/store/store";

export default function StoreList({ data }: { data: ICompanyStore[] }): JSX.Element {
    const [selected, setSelected] = useState<string | null>(null);
    const style: string = "flex items-center bg-zinc-50 rounded-lg  min-w-md shadow sm:flex dark:bg-gray-800";
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">

                <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Nuestros Socios</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Aqui podras ver todos nuestros socios</p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {data.map((store: ICompanyStore) => (
                            <article key={store.uid} className="sticky p-6 min-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-5 text-gray-500">
                                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                        <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                        Compañia
                                    </span>
                                    <span className="text-sm">{store.store.length} productos registrados</span>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate dark:text-white"><a href="#">{store.name}</a></h2>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{store.description}.</p>
                                <div className="flex justify-between truncate items-center">
                                    <div className="flex items-center truncate space-x-4">
                                        <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                        <span className="font-medium truncate dark:text-white">
                                            {store.partner.fullname}
                                        </span>
                                    </div>
                                    <Link to={`/store/${store.uid}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                        Ver productos
                                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </Link>
                                </div>

                            </article>
                        ))}
                    </div>
                </div>
            </section >

        </div >


    );
};