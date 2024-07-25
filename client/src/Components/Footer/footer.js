import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    outerContainer: {
        width: "100%",
        position: "static" ,
        bottom: "0",
        display: 'flex',
        padding: '20px 10px 5px 0',
        justifyContent: "flex-end",
        '@media (max-width: 780px)' : {
            width: '100%'
        }
    }
}));

const Footer = () => {
    const classes = useStyles();
    return(
        <div className={classes.outerContainer}>
            <div>Powered By Utopia</div>
        </div>
    )
}

export default Footer