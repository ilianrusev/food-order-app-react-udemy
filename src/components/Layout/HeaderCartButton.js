import { useContext, useEffect, useState } from "react"
import CartContext from "../../contexts/CartContext/CartContext"
import CartIcon from "../Cart/CartIcon"

import classes from './HeaderCartButton.module.css'


const HeaderCartButton = (props) => {
    const [btnHighlight, setBtnHighlight] = useState(false)
    const cartCtx = useContext(CartContext)

    const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)


    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnHighlight(true)

        const timer = setTimeout(() => {
            setBtnHighlight(false)
        }, 300);

        // return () => {
        //     clearTimeout(timer)
        // }
    }, [cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfItems}
            </span>
        </button>
    )
}

export default HeaderCartButton