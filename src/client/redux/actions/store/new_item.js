import 'whatwg-fetch';
export const ITEM_CREATE_START = 'ITEM_CREATE_START';
export const ITEM_CREATE_ERR = 'ITEM_CREATE_ERR';
export const ITEM_CREATE_SUCCESS = 'ITEM_CREATE_SUCCESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

function itemCreateStart() {
	return { 
		type: ITEM_CREATE_START
	};
}

function itemCreateErr(payload) {
	return { 
		type: ITEM_CREATE_ERR, 
		message: payload
	};
}

function itemCreateSuccess(payload) {
	return { 
		type: ITEM_CREATE_SUCCESS, 
		guid: payload[1]
	};
}

export function showSnackbar() {
	return {
		type: SHOW_SNACKBAR
	};
}

export function doItemCreate(params) {
	return (dispatch, state) => {
		console.log(params);
		dispatch(itemCreateStart());

		fetch("https://d2fzm6xoa70bg8.cloudfront.net/login?auth=e4031de36f45af2172fa8d0f054efcdd8d4dfd62")
		.then(res => res.json())
		.then(res => {
			let token = res.token;
			fetch("https://d2fzm6xoa70bg8.cloudfront.net/offernew", {
				headers: {
					'Token': token,
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: params,
			})
			.then(res => res.json())
			.then(res => {
				if (typeof res !== 'string')
					dispatch(itemCreateSuccess(res))
				else
					dispatch(itemCreateErr(res))
			})
			.catch(error => {
				dispatch(itemCreateErr(error))
			});
		})
		.catch(error => {
			dispatch(itemCreateErr(error))
		});
	};
};