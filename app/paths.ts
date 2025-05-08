export interface Path{
    style:string;
    pathname:string;
    name:string;
}

const Paths:Path[] = [
    {
        style:"cursor-pointer",
        pathname:"/home",
        name:"Inicio"
    },
    {
        style:"cursor-pointer",
        pathname:"/auth/signup",
        name:"Iniciar sesión"
    },
    {
        style:"cursor-pointer",
        pathname:"/users",
        name:"Usuarios"
    },
    {
        style:"cursor-pointer",
        pathname:"/products",
        name:"Productos"
    },
    {
        style:"cursor-pointer",
        pathname:"/companies",
        name:"Compañias"
    },
    {
        style:"cursor-pointer",
        pathname:"/stores",
        name:"Tiendas"
    }
]

export default Paths;