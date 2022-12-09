import { toast } from "react-toastify";
import { postReq } from "./apis";
import { getLoginId, getToken,  } from "./authService"; 

export const likeDesigner = async (btn, designerId, type) => {
    if (getToken()) {
        if (!btn.target.classList.contains("cl-sec-blue")) {
            btn.target.classList.add("cl-sec-blue");
        } else {
            btn.target.classList.remove("cl-sec-blue");
        }
        await postReq(`https://home-api.idesign.market/api/designers/`, {
            designerId: designerId, userId: getLoginId()
            , type: type || 1
        })
    } else {
        document.getElementById("loginBtn").click();
    }
}
export const tabs = ["onSite", "furniture" , "kitchen" ];
export const InvalidClass = {
    // border: "2px solid",
    borderColor: "#dc3545",
    paddingRight: "calc(1.5em + 0.75rem)",
    backgroundImage:
        "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right calc(0.375em + 0.1875rem) center",
    backgroundAize: "calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)",
    position: "relative"
};

export const singleOptionSelect = (id) => {
    let x = document.getElementById(id).querySelectorAll(".option-box");
    for (let i = 0; i < x.length; i++) {
        const e = x[i];
        e.addEventListener('click', () => {
            document.getElementById(id)?.querySelector(".option-box.active")?.classList.remove("active");
            if (document.getElementById(id)?.querySelector(".option-box")?.classList.contains("error-active")) {
                let x = document.getElementById(id).querySelectorAll(".option-box");
                for (let i = 0; i < x.length; i++) {
                    const e = x[i];
                    e.classList.remove("error-active");
                }
            }
            e.classList.add("active");
        })
    }
}

export const singleOptionSelectError = (id) => {
    let x = document.getElementById(id).querySelectorAll(".option-box");
    for (let i = 0; i < x.length; i++) {
        const e = x[i];
        e.classList.add("error-active");
    }
}

export const improveInput = () => {
    let allInps = [...document.getElementsByTagName("input"), ...document.getElementsByTagName("select")];
    for (let i = 0; i < allInps.length; i++) {
        const e = allInps[i];
        e.addEventListener("change", () => {
            if (e.value?.trim() !== "") {
                e.parentElement.classList.add("inpactive")
            } else {
                e.parentElement.classList.remove("inpactive")
            }
        });
    }
}

export const putCm = (x) => {
    return x && x.toLocaleString("en-IN");
}

export const sticky = (e, d) => {
    window.addEventListener("scroll", function (event) {

        try {
            var top = this.scrollY
            // left = this.scrollX;

            // console.log(top, left, document.documentElement.scrollHeight);
            if (document.querySelector(e)) {

                if (top > (d?.top || "230") && window.innerWidth > "992" && document.documentElement.scrollHeight > parseInt(top) + (d?.end || 1000)) {

                    document.querySelector(e).classList.add("stick");
                    document.querySelector(e).style.top = (d?.ptop || "100") + "px";
                    document.querySelector(e).classList.remove("bottom-0");
                    document.querySelector(e).classList.remove("position-absolute");


                } else if (document.documentElement.scrollHeight <= parseInt(top) + (d?.end || 1000)) {
                    document.querySelector(e).classList.remove("stick");
                    document.querySelector(e).style.top = "auto";
                    document.querySelector(e).classList.add("position-absolute");
                    document.querySelector(e).classList.add("bottom-0");

                } else if (top < (d?.top || "230")) {
                    document.querySelector(e).classList.remove("stick");
                    document.querySelector(e).classList.remove("position-absolute");
                    document.querySelector(e).classList.remove("bottom-0");
                    document.querySelector(e).style.top = "auto";

                }
            }


        } catch (error) {

        }
    }, false);


}


export const setLastVisited = (id) => {
    localStorage.setItem("lv", id);
}

export function getLastVisited() {
    let x = localStorage.getItem("lv");
    return x;
}

export function removeLastVisited() {
    localStorage.removeItem("lv");
}

export const scrollToVisited = async (e) => {
    let x = getLastVisited();
    if (x === e) {
        let scrollTo = document.getElementById(getLastVisited());
        await scrollTo?.scrollIntoView({
            behavior: "smooth",
            block: 'center',
            inline: 'center'
        });
        await setTimeout(async () => {
            await removeLastVisited();
        }, 3000);
    }

}

export const scrollAnimate = () => {
    const scrollElements = document.querySelectorAll(".js-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;

        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;

        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("scrolled");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("scrolled");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el)
            }
        })
    }

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    window.scrollTo(0, 3);
}

export function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface,
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)

    //USAGE:
    /*
    var el = document.getElementById('someel')
    swipedetect(el, function(swipedir){
        swipedir contains either "none", "left", "right", "top", or "down"
        if (swipedir =='left')
            alert('You just swiped left!')
    })
    */
}


export function capitalizeWords(arr) {
    return arr.map(element => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });
}

export function capFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export const handleSave = async (postId, e) => {
    if (getToken() && getLoginId()) {
        console.log(e.target.classList.contains("cl-sec-blue"))
        if (e.target.classList.contains("cl-grey1")) {
            e.target.classList.remove("cl-grey1");
        } else {
            e.target.classList.add("cl-grey1");
        }


        try {
            const res2 = await postReq(`https://pro-api.idesign.market/posts/saveUnsavePost`, {
                postId: postId,
                userId: getLoginId(),
                token: getToken()
            });
            if (res2 && !res2.error) {
            } else {
                toast.error("Soory Error Ocurred");
            }
        } catch (error) {
            toast.error("Soory Error Ocurred");
            console.log(error)
        }
    } else {
        document.getElementById("loginBtn")?.click();
    }
}

export function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export const getValidEntry = (data) => {
    return Object.keys(data)
        .filter((f) => data[f]?._count > 0)
        .reduce((r, k) => {
            r[k] = data[k];
            return r;
        }, {});


};

export const getValidFurntiure = (data) => {
    let res = {}
    for (let i = 0; i < Object.keys(data).length; i++) {
        const el = Object.keys(data)[i];
        const eld = data[el];
        if (!Array.isArray(eld)) {
            res[el] = { _name: eld?._name, _text: eld?._text };
            let noe = 0;
            for (let j = 0; j < Object.keys(eld).length; j++) {
                const elj = Object.keys(eld)[j];

                if (data[el][elj]?._count > 0) {
                    res[el][elj] = data[el][elj];
                    noe++;
                }
            }
            if (noe === 0) {
                delete res[el];
            }
        } else {
            let noe = 0;
            for (let j = 0; j < eld.length; j++) {
                noe++;
                res["Arr_" + el + "_" + noe] = { ...data[el][j], _text: el + " " + noe };
            }
        }

    }
    return res;
}

export const shapeValidFurntiure = (data) => {
    let res = { bedroom: [] };
    for (let i = 0; i < Object.keys(data).length; i++) {
        const el = Object.keys(data)[i];
        const eld = data[el];
        if (!el.includes("Arr_")) {
            res[el] = eld;
        } else {
            if (res[el.split("_")[1]]) {
                res[el.split("_")[1]].push(eld);
            } else {
                res[el.split("_")[1]] = [eld];
            }
        }
        console.log(res)

    }
    return res;
}

export const typekey = ["furniture", "kitchen", "onSite"];
export const diffkey = "furniture";
export const baseUrl = "/quo-beta";

export const isMd = window.innerWidth <= 767;

export async function createProject({ name, email, location }) {
    // const x = await postTReq(expf.pmt + "/api/projects/addClient", {
    //     name: name, email: email, location: location
    // });

    // if (x && !x.error) { 
    //     console.log(x)
    //     const y = await postReq(expf.pmt + "/api/addEditProject", { clientId: x.data._id, name: name, location: location, userId: getUserId() });
    //     // if (y && !y.error) { 
    //     //     const x = await postReq(expf.pmt + "/api/addEditProject", { clientId: x.res._id, name: name, location: location, userId: getUserId() });
    //     // }

    // }
}