import { setSummery } from "../slices/summerySlice";

export const sendSummeryToStore = (dispatch, text) => {
  // هنا ممكن تبقى API أو stream بعدين
  dispatch(setSummery(text));
  console.log("Summery sent to store:", text);
};