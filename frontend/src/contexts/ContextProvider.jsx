import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    currentUserRole: null,
    products: [],
    customers: [],
    setCurrentUser: () => { },
    setUserToken: () => { },
    setCurrentUserRole: () => { }
})

const temProducts = [
    {
        "id": 1,
        "product_id": "P1234",
        "name": "Apple 14 Pro Max",
        "category": "Smartphones",
        "brand": 'Apple',
        "description": "Best Brand for you",
        "price": 1,
        "available_quantity": 1,
    },
    {
        "id": 1,
        "product_id": "P12345",
        "name": "Nokia 3.4",
        "category": "Smart",
        "brand": 'Nokia',
        "description": "Best Brand for you",
        "price": 1,
        "available_quantity": 1,
    },
    {
        "id": 1,
        "product_id": "P12346",
        "name": "Samsung S23 Pro Max",
        "category": "Phones",
        "brand": 'Samsung',
        "description": "Best Brand for you",
        "price": 1,
        "available_quantity": 1,
    },
]

const tempCustomers = [
    {
        "id": 1,
        "customer_id": "C1234",
        "name": "Deon",
    },
    {
        "id": 1,
        "customer_id": "C1234",
        "name": "Deon",
    },
    {
        "id": 1,
        "customer_id": "C1234",
        "name": "Deon",
    },
]

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [currentUserRole, setCurrentUserRole] = useState('');
    const [products, setProducts] = useState(temProducts);
    const [customers, setCustomers] = useState(tempCustomers);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        _setUserToken(token)
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            currentUserRole,
            setCurrentUserRole,
            products,
            customers
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)