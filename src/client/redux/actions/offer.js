import 'whatwg-fetch';
export const LOAD_START = 'LOAD_START';
export const LOAD_ERROR = 'LOAD_ERROR';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';

function loadStart(payload) {
	console.log('loadStart');
	return {
		type: LOAD_START
	};
}

function loadError(payload) {
	console.log('loadError');
	return {
		type: LOAD_ERROR,
		message: payload
	};
}

function loadSuccess(payload) {
	console.log('loadSuccess');
	return { 
		type: LOAD_SUCCESS,
		data: payload
	};
}

export function getOfferData(guid) {
	return (dispatch, getState) => {
		dispatch(loadStart());
		fetch("https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
		.then(res => res.json())
		.then(res => {
			let token = res.token;
			fetch('https://d2fzm6xoa70bg8.cloudfront.net/offerinfo?guid=' + guid, {
				headers: {
					'Token': token
				},
				mode: 'cors',
				method: "GET"
			})
			.then(res => res.json())
			.then(res => {
				if (typeof res === 'string')
					dispatch(loadError(res))
				else
					dispatch(loadSuccess(res))
			})
			.catch(error => {
				dispatch(loadError(error))
			});
		})
		.catch(error => {
			dispatch(loadError(error))
		});
	};
}