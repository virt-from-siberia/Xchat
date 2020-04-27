import express from 'express';
import { UserModel } from "../models";

export default (_: express.Request, __: express.Response, next: express.NextFunction) => {

    UserModel.findOneAndUpdate({ _id: "5ea03c6928d2683954b868ec" }, {
        fullname: 'test 1',
        last_seen: new Date()
    }, { new: true },
        () => { })
    next();
};
