import { useReducer, useEffect } from "react";
import aaxios from "axios";
const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?'
export const useFetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true, })

    useEffect(() =>{
        const cancelToken = aaxios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        aaxios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: {markdown:  true, page, ...params}
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload: {jobs: res.data} })
        }).catch(e => {
            if(aaxios.isCancel(e)) return
            dispatch({type: ACTIONS.ERROR, payload: {error: e}})
        })
        return () => {
            cancelToken.cancel()
        }
    }, [params, page])
  return state
};
