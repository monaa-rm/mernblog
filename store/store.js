import { configureStore } from "@reduxjs/toolkit";

import logedSlice from "./slices/logedSlice";
import roleSlice from "./slices/roleSlice";
import user_is_active from "./slices/user_is_active";
import userImageSlice from "./slices/userImageSlice";
import usernameSlice from "./slices/usernameSlice";
import bookmarkSlice from "./slices/bookmarkSlice";
import likeSlice from "./slices/likeSlice";
import notifSlice from "./slices/notifSlice";

const store=configureStore({
   reducer:{
      logedSlice:logedSlice,
      roleSlice:roleSlice,
      notifSlice:notifSlice,
      usernameSlice: usernameSlice,
      user_is_active:user_is_active,
      bookmarkSlice:bookmarkSlice,
      likeSlice:likeSlice,
      userImageSlice:userImageSlice,
   }
});

export default store;