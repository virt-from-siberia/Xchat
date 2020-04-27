//NOTE/: external library --->
import React from "react";
import classNames from "classnames";

//NOTE/: fns library --->
import format from "date-fns/format";
import isToday from "date-fns/is_today";

//NOTE/: internal library --->
import "./DialogItem.scss";
import { IconReaded, Avatar, MessageStatus } from "../";

const getMessageTime = (created_at) => {
    if (isToday(created_at)) {
        return format(created_at, "HH:mm");
    } else {
        return format(created_at, "DD. MM. YYYY");
    }
};

// className={classNames("message", {
//                 "message--isme": isMe,
//                 "message--is-typing": isTyping,
//                 "message--is-audio": audio,
//                 "message--image": attachments && attachments.length === 1,
//             })}

const DialogItem = ({
    _id,
    user,
    unread,
    isMe,
    created_at,
    text,
    onSelect,
    currentDialogId,
}) => (
    <div
        className={classNames("dialogs__item ", {
            "dialogs__item--online": user.isOnline,
            "dialogs__item--selected": currentDialogId === _id,
        })}
        //NOTE/: Get message by id
        //BUG:/
        // onClick={() => onSelect(_id)}
        onClick={onSelect.bind(this, _id)}
    >
        <div className='dialogs__item-avatar'>
            <Avatar user={user} />
        </div>
        <div className='dialogs__item-info'>
            <div className='dialogs__item-info-top'>
                <b>{user.fullname}</b>
                <span>{getMessageTime(created_at)}</span>
            </div>
            <div className='dialogs__item-info-bottom'>
                <p>{text}</p>

                {isMe && <MessageStatus isMe={true} isReaded={false} />}
            </div>

            {/* //NOTE/: if message unread */}

            {unread > 0 && (
                <div className='dialogs__item-info-bottom-count'>
                    {/* //NOTE/: if message more than 99  */}

                    {unread > 99 ? "+99" : unread}
                </div>
            )}
        </div>
    </div>
);

export default DialogItem;
