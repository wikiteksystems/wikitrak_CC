import axios from "axios";
import { setLoading, handleAxiosError } from "./app.action";
import { notification } from "../../utils";
import { API_MODEL_URL, API_VARIANT_URL, API_OEM_URL, API_VEHICLE_URL } from "../../utils/constants";

export const SET_VEHICLE = '[LIVEMAP PAGE] SET_VEHICLE';
export const setVehicle = (vehicle) => {
    console.log('active vehicle', vehicle)
    return {
        type: SET_VEHICLE,
        payload: vehicle
    }
};
export const GET_VEHICLE = '[LIVEMAP PAGE] GET_VEHICLE';
export const getVehicle = (regId) => {
    const request = axios.get(`${API_VEHICLE_URL}/list/?registration_id=${regId}`);
    console.log(request);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;

            Promise.all([
                dispatch({
                    type: SET_VEHICLE,
                    payload: results[0]
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
};

export const GET_VEHICLE_LIST = '[LIVEMAP PAGE] GET_VEHICLE_LIST';
export const getVehicleList = (userId) => {
    const request = axios.get(`${API_VEHICLE_URL}/list/?customer_id=${userId}`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
           
            let list = [];
            results.forEach( (vehicle, index) => {
                list.push({
                    ...vehicle,
                    key: index,
                    type: 'text',
                    label: vehicle.registration_id
                });
            })

            Promise.all([
                dispatch({
                    type: GET_VEHICLE_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_OEM_LIST = '[LIVEMAP PAGE] GET_OEM_LIST';
export const getOEMList = () => {
    const request = axios.get(`${API_OEM_URL}`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            results.forEach( (oem, index) => {
                list.push({
                    ...oem,
                    key: index,
                    label: oem.name
                });
            })

            Promise.all([
                dispatch({
                    type: GET_OEM_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_VARIANT_LIST = '[LIVEMAP PAGE] GET_VARIANT_LIST';
export const getVariantList = (oemId) => {
    const request = axios.get(`${API_VARIANT_URL}/?oem=${oemId}`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            results.forEach( (variant, index) => {
                list.push({
                    ...variant,
                    key: index,
                    label: variant.variant_code
                });
            })

            Promise.all([
                dispatch({
                    type: GET_VARIANT_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_MODEL_LIST = '[LIVEMAP PAGE] GET_MODEL_LIST';
export const getModelList = (oemId) => {
    const request = axios.get(`${API_MODEL_URL}/get-models/?oem=${oemId}`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            results.forEach( (model, index) => {
                list.push({
                    ...model,
                    key: index,
                    label: model.name
                });
            })

            Promise.all([
                dispatch({
                    type: GET_MODEL_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}
export const GET_SUBMODEL_LIST = '[LIVEMAP PAGE] GET_SUBMODEL_LIST';
export const getSubModelList = (modelId) => {
    const request = axios.get(`${API_MODEL_URL}/get-models/?id=${modelId}`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            if (results.length !== 0)
                results[0].sub_models.forEach( (model, index) => {
                    list.push({
                        ...model,
                        key: index,
                        label: model.name
                    });
                })

            Promise.all([
                dispatch({
                    type: GET_SUBMODEL_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_SEGMENT_LIST = '[LIVEMAP PAGE] GET_SEGMENT_LIST';
export const getSegmentList = () => {
    const request = axios.get(`${API_MODEL_URL}/get-segment-list/`);

    return dispatch => {
        dispatch(setLoading(true));

        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            results.forEach( (segment, index) => {
                list.push({
                    ...segment,
                    key: index,
                    label: segment.segment_name
                });
            })

            Promise.all([
                dispatch({
                    type: GET_SEGMENT_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_VEHICLE_GROUP_LIST = '[LIVEMAP PAGE] GET_VEHICLE_GROUP_LIST';
export const getVehicleGroupList = (userId) => {
    const request = axios.get(`${API_VEHICLE_URL}/group/list/?user_id=${userId}`);

    return dispatch => {
        dispatch(setLoading(true));
        request.then(response => {
            const { results }  =  response.data;
            let list = [];
            results.forEach( (group, index) => {
                list.push({
                    ...group,
                    key: index,
                    label: group.group_name
                });
            })

            Promise.all([
                dispatch({
                    type: GET_VEHICLE_GROUP_LIST,
                    payload: list
                })
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const GET_FORECAST = '[LIVEMAP PAGE] GET_FORECAST';

export const getForecast = (center) => {
    console.log(center,"centerlatgetforecast")
//   const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=18.579306&lon=73.982346&appid=175e97b3a049140934d438044156c3d3';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${center.lat}&lon=${center.lng}&appid=175e97b3a049140934d438044156c3d3`;
    
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)

      dispatch({
        type: GET_FORECAST,
        payload: data,
      });

      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(setLoading(false));
    }
  };
};

  

export const SAVE_VEHICLE = '[LIVEMAP PAGE] SAVE_VEHICLE';
export const saveVehicle = (isNew, data, vehicle_id) => {
    let request = null;
    if (!isNew)
        request = axios.put(`${API_VEHICLE_URL}/update/${vehicle_id}/`, data);
    else request = axios.post(`${API_VEHICLE_URL}/create/`, data);

    return (dispatch, getState) => {
        dispatch(setLoading(true));

        request.then(response => {
            const {User} = getState();

            notification('success', 'Success', 'Vehicle detail saved successfully.');
            Promise.all([
                dispatch(getVehicleList(User.userId)),
                dispatch(getVehicle(data.registration_id))
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const DELETE_VEHICLE = '[LIVEMAP PAGE] DELETE_VEHICLE';
export const deleteVehicle = (vehicle_id) => {
    const request = axios.delete(`${API_VEHICLE_URL}/delete/${vehicle_id}/`);

    return (dispatch, getState) => {
        dispatch(setLoading(true));

        request.then(response => {
            const {User} = getState();

            notification('success', 'Success', 'Vehicle deleted successfully.');
            Promise.all([
                dispatch(getVehicleList(User.userId)),
                dispatch(setVehicle({}))
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const SAVE_VEHICLE_GROUP = '[LIVEMAP PAGE] SAVE_VEHICLE_GROUP';
export const saveVehicleGroup = (isNew, data, group_id) => {

    let request = null;
    if (!isNew)
        request = axios.put(`${API_VEHICLE_URL}/vehicle-group/update/${group_id}/`, data);
    else request = axios.post(`${API_VEHICLE_URL}/add/vehicle-group/`, data);

    return (dispatch, getState) => {
        dispatch(setLoading(true));

        request.then(response => {
            const {User} = getState();

            notification('success', 'Success', 'Group saved successfully.');
            Promise.all([
                dispatch(getVehicleGroupList(User.userId))
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const DELETE_VEHICLE_GROUP = '[LIVEMAP PAGE] DELETE_VEHICLE_GROUP';
export const deleteVehicleGroup = (group_id) => {
    const request = axios.delete(`${API_VEHICLE_URL}/vehicle-group/update/${group_id}/`);

    return (dispatch, getState) => {
        dispatch(setLoading(true));

        request.then(response => {
            const {User} = getState();

            notification('success', 'Success', 'Group deleted successfully.');
            Promise.all([
                dispatch(getVehicleGroupList(User.userId))
            ]).then( () => dispatch(setLoading(false)) );
        }).catch(error => {
            handleAxiosError(error, dispatch);
            dispatch(setLoading(false));
        })
    };
}

export const Add_Parameter_Group = '[LIVEMAP PAGE] Add_Parameter_Group';
export const addParameter = (value) => {

    return (dispatch, getState) => {
        // dispatch(setLoading(true));

        try {
            dispatch({
                type: Add_Parameter_Group,
                payload: value,
              });
        } catch (error) {
            // handleAxiosError(error, dispatch);
            // dispatch(setLoading(false));
            console.log("add parameter error ", error);   
        }
    };
}

export const GET_SERVICES = '[LIVEMAP PAGE] GET_SERVICES';
export const getServices = (services,active_vehiLocation) => {
    // console.log(active_vehiLocation, "active_vehiLocation")
    const apiUrl = `${process.env.REACT_APP_API2_URL}/api/nearby-places?location=${active_vehiLocation.lat},${active_vehiLocation.lng}&radius=1000&types=${services}`;
  
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        // console.log(data, "services")
  
        dispatch({
          type: GET_SERVICES,
          payload: data,
        });
  
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      }
    };
  };

export const ADD_COORIDNATES_TO_OBJ = '[LIVEMAP PAGE] ADD_COORIDNATES_TO_OBJ';
export const add_cooridinates_to_obj = (value) => {

    return (dispatch, getState) => {
        // dispatch(setLoading(true));

        try {
            dispatch({
                type: ADD_COORIDNATES_TO_OBJ,
                payload: value,
              });
        } catch (error) {
            // handleAxiosError(error, dispatch);
            // dispatch(setLoading(false));
            console.log("add parameter error ", error);   
        }
    };
}