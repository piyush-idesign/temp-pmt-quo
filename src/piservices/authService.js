import http from "./httpservices";
import jwtDecode from "jwt-decode";
import { delReq, getReq, postReq, putReq } from "./apis";
import constants from "./constants";

const tokenKey = "token";
const id = "id";
const fromRoute = "fromRoute";

export async function lastPageRed() {
  let x = localStorage.getItem(fromRoute);
  if (x.includes("login")) {
    x = undefined;
  }
  localStorage.removeItem(fromRoute);
  window.location.href = x || "/find-professionals";
}

export function generate(token) {
  try {
    const user = jwtDecode(token);
    console.log(user)
    localStorage.setItem(tokenKey, token);
    localStorage.setItem("id", user["_id"]);
    localStorage.setItem("email", user["email"]);
    user["name"] && localStorage.setItem("name", user["name"]);

    lastPageRed();
  } catch (error) {
    window.location.href = "/"
  }
}

export async function login(loginData) {
  const { data: token } = await http.post("auth/", loginData);

  if (token) {
    generate(token);
  } else {
    alert("something fail while login");
  }
  return token;
}

export function loginwithtoken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getToken() {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    return token;
  } else {
    return null;
  }
}

export function getUserId() {
  const userId = localStorage.getItem("userId");
  if (userId) {
    return userId;
  } else {
    return null;
  }
}

export function getLoginId() {
  const loginid = localStorage.getItem(id);
  if (loginid) {
    return loginid;
  } else {
    return null;
  }
}

export function getLeadId() {
  const loginid = localStorage.getItem("leadId");
  if (loginid) {
    return loginid;
  } else {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(id);
  localStorage.removeItem("email");

  window.location.reload();
  return true;
}

export function apiLogout() { }

export function getLocalStorage(name) {
  const result = localStorage.getItem(name);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export function getLocalStorageObj() {
  return {
    user_id: getLocalStorage("id"),
    token: getLocalStorage("token"),
    profile_id: getLocalStorage("profile_id"),
  };
}

export async function sendingOTP() {
  const { data } = await http.get("sendingotp/", {
    params: getLocalStorageObj(),
  });
  return data;
}

export async function register(userdata) {
  const response = await http.post(`user/`, userdata);
  // console.log(response.headers["x-auth-token"]);
  const data = response.data;
  localStorage.setItem(tokenKey, data[tokenKey]);
  lastPageRed();

  return data;
}


export async function subscribe(letterdata) {
  const response = await http.post(`newsletter/`, letterdata);
  // console.log(response.headers["x-auth-token"]);
  const data = response.data;
  return data;
}



export function getApiPath() {
  return process.env.REACT_APP_API_URL;
}

export async function sendOTP(email) {
  const res = await postReq("http://3.111.240.137:4006/api/send", { email: email });
  return res;
}

export async function verfyOTP(verfiyData) {
  const res = await postReq("http://3.111.240.137:4006/api/verfiy", verfiyData);
  return res;
}

export async function onboarded(navigate) {
  const res = await getReq(constants.proapi + "/homeOwner/getHomeOwner?token=" + getToken() + "&homeOwner_id=" + getLoginId());
  if (res && !res.error) {
    if (res.data && res.data.data?.length !== 0) {
      console.log(res.data.data[0]);
      localStorage.setItem("leadId", res.data.data[0]?._id)
      if (!res.data.data[0].location || !res.data.data[0].name) {
        navigate("/dashboard/onboard/step1");
        return;
      }
      if (!res.data.data[0].requirements) {
        navigate("/dashboard/onboard/step2");
        return;
      }
      if (!res.data.data[0].renovationTimeline) {
        navigate("/dashboard/onboard/step3");
        return;
      }
      if (!res.data.data[0].config) {
        navigate("/dashboard/onboard/step4");
        return;
      }
      if (!res.data.data[0].propertyType) {
        navigate("/dashboard/onboard/step5");
        return;
      }
      if (!res.data.data[0].budget) {
        navigate("/dashboard/onboard/step6");
        return;
      }
      if (!res.data.data[0].phoneNumber) {
        navigate("/dashboard/onboard/step7");
        return;
      }
      return { status: true };
    } else {
      navigate("/dashboard/onboard/step1")
      return { status: false }
    }
  } else {
    return;
  }
}

export async function addBasicDetails(data) {
  const res = await postReq(constants.proapi + "/homeOwner/fewDetails",
    { ...data, homeOwner_id: getLoginId(), token: getToken() }
  );
  if (res && !res.error) {
    console.log(res)
    return { status: true };
  } else {
    return { status: false };
  }
}

export async function updateBasicDetails(route, data) {
  const res = await putReq(constants.proapi + "/homeOwner/" + route,
    { ...data, homeOwner_id: getLoginId(), token: getToken() }
  );
  if (res && !res.error) {
    console.log(res)
    return { status: true };
  } else {
    return { status: false };
  }
}

export async function deleteIntChat(data) {
  const res = await delReq("https://chat.idesign.market/conversation/delete-conversation", data);
  if (res && !res.error) {
    console.log(res)
    return { status: true };
  } else {
    return { status: false };
  }
}

export async function uploadImages(data) {
  console.log(data)
  let imgshtml = ""
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    const payload = new FormData();
    payload.append("uploadImg", el);
    const res = await postReq("https://noteyard-backend.herokuapp.com/api/blogs/uploadImg", payload);
    if (res && !res.error) {
      console.log(res);
      imgshtml += `<img src="https://noteyard-backend.herokuapp.com/${res?.data?.url}" />`
    } else {
      return { error: "Couldn't Upload Img" };
    }
  }

  return imgshtml;
}
const expf = {
  getToken,
  logout,
  login,
  getApiPath,
  loginwithtoken,
  getLocalStorage,
  getLocalStorageObj,
  register,
  generate,
  getLoginId,
  subscribe,
  sendOTP,
  verfyOTP
};


export default expf;