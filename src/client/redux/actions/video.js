import 'whatwg-fetch';
export const DELETE_RECORD = 'DELETE_RECORD';
export const UPLOAD_START = 'UPLOAD_START';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const SET_OFFER = 'SET_OFFER';
export const UPDATE_SUBTITLES = 'UPDATE_SUBTITLES';
export const SET_VIDEO_DURATION = 'SET_VIDEO_DURATION';

function uploadStart(payload) {
	return {
		type: UPLOAD_START,
		url: payload
	};
}

function uploadError(payload) {
	return {
		type: UPLOAD_ERROR
	};
}

function uploadSuccess(payload) {
	return { 
		type: UPLOAD_SUCCESS,
		payload: payload.data
	};
}

export function setDuration(payload) {
	return {
		type: SET_VIDEO_DURATION,
		duration: payload
	}
}

export function deleteRecord() {
	return (dispatch, getState) => {
		dispatch({
			type: DELETE_RECORD
		});
	}
}

export function setOfferForm() {
	return (dispatch, getState) => {
		dispatch({
			type: SET_OFFER
		});
	}
}

export function updateSubtitles(subtitles) {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_SUBTITLES,
			subtitles: subtitles
		});
	}
}

// https://d3j22jloo6hpq6.cloudfront.net/API/parse
// https://shopshots-argvil19.c9users.io/API/parse

export function setRecord(data, url) {
	return (dispatch, getState) => {
		dispatch(uploadStart(url));
		fetch('https://d3j22jloo6hpq6.cloudfront.net/API/parse', {
			method: "POST",
			mode: 'cors',
			body: data
		})
		.then(res => res.json())
		.then(res => {
			if (!res.success) {
				dispatch(uploadError(null));
			} else {
				dispatch(uploadSuccess(res));
			}
		})
		.catch(error => {
			dispatch(uploadError(null));
		});
	};
}