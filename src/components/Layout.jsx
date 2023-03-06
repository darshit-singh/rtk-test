import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout

//we can include header/footer in this layout file.
//outlet refers to all the children 