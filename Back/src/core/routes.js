import { updateLastSeen, checkAuth } from "../middlewares";
import { loginValidation } from "../utils/validations";
import bodyParser from "body-parser";
import socket from "socket.io";
import { UserCtrl, DialogCtrl, MessageCtrl } from "../controllers";

//TODO:===

const createRoutes = (app, io) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);

    //NOTE/: parse application/json
    app.use(bodyParser.json());
    app.use(updateLastSeen);
    app.use(checkAuth);

    app.get("/user/me", UserController.getMe);
    app.get("/user/:id", UserController.show);
    app.post("/user/registration", UserController.create);
    app.delete("/user/:id", UserController.delete);
    app.post("/user/login", loginValidation, UserController.login);

    app.get("/dialogs", DialogController.index);
    app.delete("/dialogs/:id", DialogController.delete);
    app.post("/dialogs", DialogController.create);

    app.get("/messages", MessageController.index);
    app.post("/messages", MessageController.create);
    app.delete("/messages/:id", MessageController.delete);
};

export default createRoutes;
