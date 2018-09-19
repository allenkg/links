export const FETCH_DATA = '@@MAIN_PAGE/FETCH_DATA';
export const FETCH_DATA_SUCCESS = '@@MAIN_PAGE/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = '@@MAIN_PAGE/FETCH_DATA_FAILURE';


export const ADD_LINK_HREF = '@@MAIN_PAGE/ADD_LINK_HREF';
export const ADD_LINK_HREF_SUCCESS = '@@MAIN_PAGE/ADD_LINK_HREF_SUCCESS';
export const ADD_LINK_HREF_FAILURE = '@@MAIN_PAGE/ADD_LINK_HREF_FAILURE';


export function fetchData() {
  return async (dispatch) => {
    dispatch({type: FETCH_DATA});
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('userId');
      const response = await fetch(`/api/links/?user_id=${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      dispatch({type: FETCH_DATA_SUCCESS, data});

    } catch (e) {
      dispatch({type: FETCH_DATA_FAILURE})
    }
  }
}

export function addLink(href) {
  return async (dispatch) => {
    dispatch({type: ADD_LINK_HREF});
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/links/',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            href: href,
            token: token
          }),
        });
      const data = await response.json();
      dispatch({ type: ADD_LINK_HREF_SUCCESS, data })
        } catch (e) {
      dispatch({ type: ADD_LINK_HREF_FAILURE, e})
    }
  }
}

