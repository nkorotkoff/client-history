import authStore from "../store/auth";

const Logout = () => {
    const {logout} = authStore((state) => ({logout: state.logout}));
    logout()
    return(
        <></>
    )
}

export default Logout