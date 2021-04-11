import React, { useState, useEffect } from 'react';
import {  CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import useStyles from "./style";
import ShippingAddress from "./ShippingAddress";
import PaymentDetail from "./PaymentDetail";

import { commerce } from '../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const test = (data) => {
        setShippingData(data);
    
        nextStep();
      };

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
            console.log('\n token>>', token)
              setCheckoutToken(token);
            } catch (error){
                console.log('\n token error', error)
              if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);

      let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {
                        activeStep === 0 && checkoutToken && (
                            <ShippingAddress 
                            checkoutToken={checkoutToken} 
                            nextStep={nextStep} 
                            setShippingData={setShippingData} 
                            test={test}/>
                        )
                    }
                    {
                        activeStep === 1 && checkoutToken && (
                            <PaymentDetail 
                            checkoutToken={checkoutToken} 
                            nextStep={nextStep} 
                            backStep={backStep} 
                            shippingData={shippingData} 
                            onCaptureCheckout={onCaptureCheckout}
                            />
                        )
                    }
                    {
                        activeStep == steps.length && (
                            <Confirmation />
                        )
                    }
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Checkout;