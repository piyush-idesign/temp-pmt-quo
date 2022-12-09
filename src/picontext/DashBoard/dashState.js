import React, { useState } from "react";
import desquoContext from "./desquoContext";

const DesQuoState = (props) => {
    const [selectedCards, setSelectedCards] = useState();
    const [currSavedTab, setCurrSavedTab] = useState({ designers: true });
    const [showChat, setShowChat] = useState();
    const [allAvChatRes, setAllAvChatRes] = useState();
    const [activeChat, setActiveChat] = useState();
    const [activeChatMsgs, setActiveChatMsgs] = useState();
    const [socket, setSocket] = useState(null);
    const [msg, setMsg] = useState();
    const [searchKey, setSearchKey] = useState("");
    const [paData, setPaData] = useState({});
    const [fields, setFields] = useState({ total: 0, empty: 0, filled: 0 });
    const [tb, setTb] = useState();
    const [activeModal, setActiveModal] = useState();
    const [currTb, setCurrTb] = useState();
    const [des, setDes] = useState();
    const [homData, setHomData] = useState();
    const [action, setAction] = useState();

    const catTemplate = {
        name: "New Item",
        open: true,
        item: [{
            itemdesc: " <b>Item Name</b> <br> <p>It is a long established fact that a reader by the readable content of a page when looking at </p> ",
            unit: "sqft",
            quantity: 300,
            price: 400,
            comments: [],
            _id: "123456"
        }, {
            itemdesc: "",
            unit: "sqft",
            comments: [],
            _id: "123457"
        }, {
            itemdesc: "",
            unit: "sqft",
            comments: [],
            _id: "123458"
        }]

    }
    const [newCats, setNewCats] = useState({
        onSite: [],
        furniture: [],
        kitchen: []
    });

    const [initialQuo, setInitialQuo] = useState();

    const setRoomActiveChat = (data) => {
        if (data?.conversationId) {
            socket.emit("joinChat", data.conversationId)
        }
        setActiveChat(data)
    }

    const [selectedFields, setSelectedFields] = useState({});

    const [propertyDetails, setPropertyDetails] = useState({
        propertyType: "Apartment",
        carpetAreaUnit: "sqft",
        bhk: "1"
    });
    const [need, setNeed] = useState({
        bathroom: { label: "Bathroom", value: 0 },
        balcony: { label: "Balcony", value: 0 },
        homeOffice: { label: "Home Office", value: 0 },
        pujaRoom: { label: "Pooja_Room", value: 0 },
        livingRoom: { label: "Living Room", value: 0, req: true },
        bedRoom: { label: "Bedroom", value: 0, req: true },
        kitchen: { label: "Kitchen", value: 0, req: true },
    });


    const [selectedLead, setSelectedLead] = useState();
    const [draggable, setDraggable] = useState(false);
    const [draggableItem, setDraggableItem] = useState(false);

    return (
        <desquoContext.Provider
            value={{
                selectedCards,
                setSelectedCards,
                currSavedTab,
                setCurrSavedTab,
                showChat,
                setShowChat,
                allAvChatRes, setAllAvChatRes,
                activeChat,
                setActiveChat,
                activeChatMsgs,
                setActiveChatMsgs,
                socket,
                setSocket,
                setRoomActiveChat,
                msg,
                setMsg,
                searchKey,
                setSearchKey,
                paData,
                setPaData,
                fields,
                setFields,
                tb,
                setTb,
                activeModal,
                setActiveModal,
                currTb,
                setCurrTb,
                des,
                setDes,
                selectedFields,
                setSelectedFields,
                need,
                setNeed,
                propertyDetails,
                setPropertyDetails,
                selectedLead,
                setSelectedLead,
                newCats,
                setNewCats,
                catTemplate,
                action,
                setAction,
                draggable,
                setDraggable,
                draggableItem,
                setDraggableItem,
                homData, setHomData,
                initialQuo, setInitialQuo

            }}
        >
            {props.children}
        </desquoContext.Provider>
    );
};

export default DesQuoState;
