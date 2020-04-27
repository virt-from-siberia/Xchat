//NOTE/: Axios
import { userApi } from "../../utils/api";

//NOTE/: Sync
const Actions = {
    setUserData: (data) => ({
        type: "USER:SET_DATA",
        payload: data,
    }),

    // fetchUserLogin: (postData) => (dispatch) => {
    //     dispatch(Actions.setUserData(postData));
    // },

    fetchUserData: (token) => (dispatch) => {
        //    const token = window.localStorage.token;
        userApi.getMe(token).then(({ data }) => {
            //FIXME: CONSOLE LOG ===========>
            console.log(data);
            dispatch(Actions.setUserData(data));
        });
    },
};

export default Actions;
