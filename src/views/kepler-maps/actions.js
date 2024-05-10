
export const SET_ZOOM_LEVEL = 'SET_ZOOM_LEVEL';

export function setZoomLevel(zoomLevel) {
    return {
        type: SET_ZOOM_LEVEL,
        payload: { zoomLevel }
    };
}
