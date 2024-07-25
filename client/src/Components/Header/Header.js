import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth-actions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "#050505",
    color: "#e41515"
  },
  groupButtons: {
    display: "flex",
    alignItems: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const Header = props => {
  const classes = useStyles();
  const { title, user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    props.logout(props.history);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {props.page === undefined || props.page !== "signin" ? (
              <Typography
                component="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "15px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  props.history.goBack();
                }}
              >
                <ArrowBackIcon />
              </Typography>
            ) : null}

            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </div>
          {props.page !== "signin" && props.page !== "home" ? (
            <img
              src="Assets/logo.jpeg"
              style={{ width: "50px", height: "50px" }}
              alt="Bluetap Logo"
            />
          ) : null}
          {props.page === undefined || props.page !== "signin" ? (
            <div className={classes.groupButtons}>
              <Typography variant="h6" className={classes.title}>
                {user ? user.name : ""}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authState.user
});

export default connect(mapStateToProps, { logout })(Header);
