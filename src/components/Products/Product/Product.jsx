import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, makeStyles } from '@material-ui/core';
import { AddShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
}));

const Product = ({ product, onAddToCart }) => {

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        { product.name }
                    </Typography>
                    <Typography variant="h5">
                        { product.price.formatted_with_symbol }
                    </Typography>
                </div>
                <Typography 
                    variant="body2" 
                    color="textSecondary"
                    dangerouslySetInnerHTML={{__html: product.description}}
                />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;