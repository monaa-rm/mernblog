"use client";
import { useDispatch } from "react-redux";
import { setuserImageValue } from "@/store/slices/userImageSlice";
import { userIsActiveToTrue } from "@/store/slices/user_is_active";
import { setRoleValue } from "@/store/slices/roleSlice";
import { logedToTrue } from "@/store/slices/logedSlice";
import { setusernameValue } from "@/store/slices/usernameSlice";
import { useEffect } from "react";
import { setnotifValue } from "@/store/slices/notifSlice";

const ReduxVarsDefaultValueSetter = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setuserImageValue(data.data.user_image ?? ""));
    dispatch(setnotifValue(data.data.notif_number ?? 0))
    data.data.user_is_active == true
      ? dispatch(userIsActiveToTrue())
      : null;
    dispatch(setusernameValue(data.data.blog_slug));

    dispatch(setRoleValue(data.data.role ?? 2));
    
    data.data.loged == true ? dispatch(logedToTrue()) : null;
  }, [data]);

  return <div className="w-0"></div>;
};

export default ReduxVarsDefaultValueSetter;
