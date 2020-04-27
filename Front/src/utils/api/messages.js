import { axios } from "../../core";

export default {
    //BUG://
    // getAllByDialogId: (id) => axios.get("/messages?_id=" + id),
    getAllByDialogId: (id) => axios.get("/messages?_id" + id),
};
