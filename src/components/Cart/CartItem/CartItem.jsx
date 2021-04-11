import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import useStyles from "./style";

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const classes = useStyles();

    const onUpdateQty = event => {
        const isIncrease = event.currentTarget.getAttribute('data-type') === 'increase';
        handleUpdateCartQty(item.id, isIncrease ? item.quantity + 1 : item.quantity - 1);
    };
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">
                    {item.name}
                </Typography>
                <Typography variant="h5">
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button 
                        type="button" 
                        size="small"
                        onClick={onUpdateQty}
                        data-type="decrease"
                    >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button 
                        type="button" 
                        size="small"
                        data-type="increase"
                        onClick={onUpdateQty}
                    >+</Button>
                </div>
                <Button 
                    variant="contained" 
                    type="button" 
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;