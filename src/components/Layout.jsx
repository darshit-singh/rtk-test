import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>

    )
}

export default Layout

//we can include header/footer in this layout file.
//outlet refers to all the children 