import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import MyPosts from "../Profile/MyPosts/MyPosts";

const DialogsContainer = () => {

    return <StoreContext.Consumer>{
        (store) => {

            let onSendMessageClick = () => {
                store.dispatch(sendMessageCreator());
            }

            let onNewMessageChange = (body) => {
                store.dispatch(updateNewMessageBodyCreator(body));
            }

            return <Dialogs
                updateNewMessageBody={onNewMessageChange}
                sendMessage={onSendMessageClick}
                dialogsPage={store.getState().dialogsPage}
            />
        }
    }
    </StoreContext.Consumer>
}

export default DialogsContainer;
