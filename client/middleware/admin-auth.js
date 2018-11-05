export default function ({
    store,
    redirect
}) {
    // If the user is not authenticated
    if (!store.state.auth.auth) {
        console.log("Admin haven't login!")
        return redirect("/login")
    }

    console.log(store.state.auth.currentUser)

    // 如果当前登录用户不是管理员用户
    if (store.state.auth.currentUser.roles.indexOf("admin") < 0) {
        console.log("User is not admin!")
        console.log(store.state.auth.currentUser.roles)
        return redirect("/login")
    }
}
