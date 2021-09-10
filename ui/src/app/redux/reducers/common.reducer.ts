import { KUNDENLIST } from "../types";

const initialState = { kundenlist: [] };

export default function (state = initialState, action:any) {
  const { type, payload } = action;

  switch (type) {
    case KUNDENLIST:
      return { ...payload };

    default:
      return state;
  }
}