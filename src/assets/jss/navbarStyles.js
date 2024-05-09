const navbarStyles = theme => ({
    heading: {
        // marginLeft: "20px",
    },
    flex: {
        flexGrow: 1
    },
    linkPlacement: {
        display: "flex",
        justifyContent: "flex-end",
    },
    linkStyle: {
        color: "#fff",
        background: "#0000002c",
        borderRadius: "6px",
        '&:hover, &:focus': {
            background: "#ffffff2c"
        }
    },
    navLink: {
        textDecoration: "none",
        marginRight: "20px",
        textTransform: "capitalize"
    },
    activeRoute: {
        background: "#ffffff2c"
    },
    appBarStyle: {
        backgroundColor: "#29323C",
    },
    drawerPaper:{
        background: "rgb(42, 42, 42)",
        color: "#fff",
        padding: "30px",
    },
    listItems:{
        marginTop: "15px",
    }
})

export default navbarStyles;