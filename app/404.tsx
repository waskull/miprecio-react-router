import { Link } from "react-router";

export default function NoMatch() {
    return (
    <section className="bg-white dark:bg-gray-900 flex items-center min-h-screen">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-500 dark:text-red-600">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Ups! Pagina no encontrada.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Lo siento pero lo que buscas no existe</p>
            <Link to="/" className="inline-flex text-white bg-zinc-900 dark:bg-zinc-50 dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:focus:ring-zinc-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-900 my-4">Volver</Link>
        </div>   
    </div>
</section>
);
}