import { getElementById } from "./domutils";

const TOGGLE_INTERVAL_MS = 4000;

type State = {
  active: string;
  inactive: string;
};

const state: State = { active: "rights", inactive: "updated" };

const toggleState = (state: State) => {
  const { active, inactive } = state;
  state.active = inactive;
  state.inactive = active;
};

setInterval(() => {
  getElementById(`footer-${state.active}`).style.display = "none";
  getElementById(`footer-${state.inactive}`).style.display = "block";
  toggleState(state);
}, TOGGLE_INTERVAL_MS);
