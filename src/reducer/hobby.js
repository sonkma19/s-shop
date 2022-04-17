
const initalHobby = {
    list: JSON.parse(localStorage.getItem("task")) || null,
    token: JSON.parse(localStorage.getItem("token")) || null
}
const userReducer = (state = initalHobby, action) => {
    switch (action.type) {
        case "LOGIN": {
            let newList = state.list
            newList = action.payload.result
            let newtoken = action.payload.token
            localStorage.setItem("token", JSON.stringify(newtoken))
            localStorage.setItem("task", JSON.stringify(newList))
            return {
                ...state,
                list: newList,
                token:newtoken
            }
        }
        case "SIGNOUT": {
            let signOut = state.list
            signOut = null

            localStorage.setItem("task", JSON.stringify(signOut))
            return {
                ...state,
                list: signOut
            }
        }
        case "SIGNUP": {
            let signUp = state.list
            signUp = action.payload.result
            let newtoken = action.payload.token

            localStorage.setItem("task", JSON.stringify(signUp))
            localStorage.setItem("token", JSON.stringify(newtoken))
            return {
                ...state,
                list: signUp
            }
        }

        default:
            return state
    }
}

export default userReducer
