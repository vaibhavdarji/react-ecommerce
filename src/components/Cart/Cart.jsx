import React from 'react';
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom"
import useStyles from './style';
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    
    if (!cart.line_items) {
        return (
            <h1>Loading ...</h1>
        )
    }
    const isEmpty = !cart.line_items.length;
    return (
        <Container>
            <div className={classes.toolbar}></div>
            <Typography variant="h3" className={classes.title} gutterBottom>
                Your Shopping Cart
            </Typography>
            {
                isEmpty && (
                    <Typography variant="subtitle1">
                        You have no Items in shopping cart,
                        <Link to="/" className={classes.link}>
                            start adding some
                        </Link>
                        !
                    </Typography>
                )
            }
            {
                !isEmpty && (
                    <React.Fragment>
                        <Grid container spacing={3}>
                            {
                                cart.line_items.map(item => (
                                    <Grid item xs={12} sm={4} key={item.id}>
                                        <CartItem 
                                            item={item} 
                                            handleUpdateCartQty={handleUpdateCartQty}
                                            handleRemoveFromCart={handleRemoveFromCart}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <div className={classes.cartDetails}>
                            <Typography variant="h4">
                                Subtotal: { cart.subtotal.formatted_with_symbol }
                            </Typography>
                            <div>
                                <Button 
                                    className={classes.emptyButton}
                                    size="large"
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleEmptyCart}
                                >
                                    Empty Cart
                                </Button>
                                <Button 
                                    className={classes.checkoutButton}
                                    size="large"
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/checkout"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        </Container>
    );
};

export default Cart;