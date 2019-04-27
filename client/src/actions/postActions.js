import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types";

// Add a post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", post)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
