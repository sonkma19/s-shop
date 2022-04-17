import Login from '../pages/Login'
import Signup from '../pages/Signup'
import HomePage from '../pages/HomePage'
import DetailProduct from '../pages/DetailProduct'
import NotFind from '../pages/NotFind'
import MenuList from '../pages/MenuList'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'
import HistoryProduct from '../pages/HistoryProduct'

const router = [
    {
        path: "/",
        exact: true,
        main: () => <HomePage />
    },
    {
        path: "/login",
        exact: false,
        main: () => <Login  />
    },
    {
        path: "/sign-up",
        exact: false,
        main: () => <Signup  />
    },
    {
        path: "/products/:name",
        exact: false,
        main: () => <DetailProduct/>
    },
    {
        path: "/san-pham/:name",
        exact: false,
        main: () => <NotFind />
    },
    {
        path: "/menu-list/:name",
        exact: false,
        main: (match) => <MenuList match={match}/>
    },
    {
        path: "/gio-hang",
        exact: false,
        main: () => <Cart/>
    },
    {
        path: "/thanh-toan",
        exact: false,
        main: () => <CheckOut/>
    },
    {
        path: "/lich-su-don-hang",
        exact: false,
        main: () => <HistoryProduct/>
    }
    
    
]
export default router