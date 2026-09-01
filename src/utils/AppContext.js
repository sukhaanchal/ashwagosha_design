import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  active: 'calendar',
  dayOffset: 0,
  monthOffset: 0,
  sheetExpanded: false,
  showPrefs: false,
  showFull: false,
  showEvent: false,
  locIdx: 0,
  locOpen: false,
  addMenuOpen: false,
  events: {},
  prefsSelected: ['Career', 'Love', 'Wellness', 'Spirituality'],
  prefsSuggested: ['Money', 'Family', 'Dreams', 'Meditation', 'Astro literacy', 'Rituals'],
  dobDay: 15,
  dobMonth: 5,
  dobYear: 1995,
  timeVal: '',
  placeVal: '',
  eventKind: 'event',
  eventTitle: '',
  eventLocation: '',
  eventNotes: '',
  startYMD: null,
  endYMD: null,
  startH: 7,
  startMin: 0,
  startAmpm: 'AM',
  endH: 8,
  endMin: 0,
  endAmpm: 'AM',
  eventActiveField: null,
  calY: null,
  calM: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload };
    case 'TOGGLE_LOC':
      return { ...state, locOpen: !state.locOpen };
    case 'SELECT_LOC':
      return { ...state, locIdx: action.idx, locOpen: false };
    case 'PREV_MONTH':
      return { ...state, monthOffset: state.monthOffset - 1 };
    case 'NEXT_MONTH':
      return { ...state, monthOffset: state.monthOffset + 1 };
    case 'PREV_DAY':
      return { ...state, dayOffset: state.dayOffset - 1 };
    case 'NEXT_DAY':
      return { ...state, dayOffset: state.dayOffset + 1 };
    case 'SELECT_DAY':
      return { ...state, dayOffset: action.offset };
    case 'TOGGLE_MONTH':
      return { ...state, sheetExpanded: !state.sheetExpanded };
    case 'OPEN_FULL':
      return { ...state, showFull: true };
    case 'CLOSE_FULL':
      return { ...state, showFull: false };
    case 'OPEN_PREFS':
      return { ...state, showPrefs: true };
    case 'CLOSE_PREFS':
      return { ...state, showPrefs: false };
    case 'OPEN_EVENT':
      return {
        ...state,
        showEvent: true,
        eventKind: action.kind || 'event',
        eventActiveField: null,
        startYMD: null,
        endYMD: null,
        calY: null,
        calM: null,
        addMenuOpen: false,
      };
    case 'CLOSE_EVENT':
      return { ...state, showEvent: false, eventActiveField: null };
    case 'TOGGLE_MENU':
      return { ...state, addMenuOpen: !state.addMenuOpen };
    case 'ADD_PREF': {
      const { label } = action;
      return {
        ...state,
        prefsSelected: state.prefsSelected.includes(label) ? state.prefsSelected : [...state.prefsSelected, label],
        prefsSuggested: state.prefsSuggested.filter(x => x !== label),
      };
    }
    case 'REMOVE_PREF': {
      const { label } = action;
      return {
        ...state,
        prefsSelected: state.prefsSelected.filter(x => x !== label),
        prefsSuggested: state.prefsSuggested.includes(label) ? state.prefsSuggested : [...state.prefsSuggested, label],
      };
    }
    case 'CLEAR_PREFS':
      return { ...state, prefsSelected: [], timeVal: '', placeVal: '' };
    case 'SAVE_EVENT': {
      const base = new Date(2026, 7, 20);
      base.setDate(base.getDate() + state.dayOffset);
      const sd = state.startYMD || { y: base.getFullYear(), m: base.getMonth(), d: base.getDate() };
      const key = `${sd.y}-${sd.m}-${sd.d}`;
      const evs = { ...state.events };
      const list = evs[key] ? [...evs[key]] : [];
      list.push({
        kind: state.eventKind,
        title: state.eventTitle,
        location: state.eventLocation,
        notes: state.eventNotes,
        startTime: `${state.startH}:${String(state.startMin).padStart(2, '0')} ${state.startAmpm}`,
        endTime: `${state.endH}:${String(state.endMin).padStart(2, '0')} ${state.endAmpm}`,
      });
      evs[key] = list;
      const savedDate = new Date(sd.y, sd.m, sd.d);
      const today = new Date(2026, 7, 20);
      const newOffset = Math.round((savedDate - today) / 86400000);
      return {
        ...state,
        events: evs,
        showEvent: false,
        eventTitle: '',
        eventLocation: '',
        eventNotes: '',
        eventActiveField: null,
        dayOffset: newOffset,
      };
    }
    case 'TOGGLE_EVENT_FIELD': {
      const { field } = action;
      const next = state.eventActiveField === field ? null : field;
      const patch = { eventActiveField: next };
      if (field === 'startDate' || field === 'endDate') {
        const base = new Date(2026, 7, 20);
        base.setDate(base.getDate() + state.dayOffset);
        const ymd = field === 'startDate'
          ? (state.startYMD || { y: base.getFullYear(), m: base.getMonth(), d: base.getDate() })
          : (state.endYMD || { y: base.getFullYear(), m: base.getMonth(), d: base.getDate() });
        patch.calY = ymd.y;
        patch.calM = ymd.m;
      }
      return { ...state, ...patch };
    }
    case 'EVENT_CAL_STEP': {
      const cm = ((state.calM != null ? state.calM : 7) + action.delta);
      const cy = state.calY != null ? state.calY : 2026;
      const d = new Date(cy, cm, 1);
      return { ...state, calY: d.getFullYear(), calM: d.getMonth() };
    }
    case 'PICK_EVENT_DATE': {
      const { y, m, d, field } = action;
      const picked = { y, m, d };
      if (field === 'startDate') return { ...state, startYMD: picked, eventActiveField: null };
      return { ...state, endYMD: picked, eventActiveField: null };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
