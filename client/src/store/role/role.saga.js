import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./role.service";
import {
  ADD_ROLE_PERMISSION,
  CREATE_ROLE, CREATE_ROLE_SUCCESS,
  DELETE_ROLE, DELETE_ROLE_PERMISSION, DELETE_ROLE_PERMISSION_SUCCESS, DELETE_ROLE_SUCCESS,
  GET_ROLE,
  GET_ROLE_BY_ID,
  GET_ROLE_BY_ID_SUCCESS,
  GET_ROLE_SUCCESS
} from "./role.types";
import { roleActions } from "./index";

function* createRole(action) {
  try {
    const res = yield call( authService.createRoleService, action.payload.body );
    // yield put(roleActions.getRole())
    yield put({
      type: CREATE_ROLE_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    console.log(err)
  }
}

function* getRole(action) {
  try {
    const res = yield call( authService.getRoleService, action.payload );
    yield put({
      type: GET_ROLE_SUCCESS,
      payload: res.data.reverse(),
    });

  } catch (err) {
    console.log(err)
  }
}

function* deleteRole(action) {
  try {
    const res = yield call( authService.deleteRoleService, action.payload.id );
    yield put(roleActions.getRole())

  } catch (err) {
    console.log(err)
  }
}

function* getRoleById(action) {
  try {
    const res = yield call( authService.getRoleByIdService, action.payload.id );
    yield put({
      type: GET_ROLE_BY_ID_SUCCESS,
      payload: res.data,
    });


  } catch (err) {
    console.log(err)
  }
}


function* addRolePermission(action){
  try {
    const res = yield call( authService.addRolePermissionService, action.payload.body );
    yield put ( roleActions.getRoleById(action.payload.body.roleId) )
  }catch (err){

  }
}
function* deleteRolePermission(action){
  try {
    const res = yield call( authService.deleteRolePermissionService, action.payload.data );
  yield put ( roleActions.getRoleById(action.payload.data.roleId) )

  }catch (err){

  }
}

export const watchRole = function* watchRoleSaga() {
  yield takeLatest( CREATE_ROLE, createRole );
  yield takeLatest( GET_ROLE, getRole );
  yield takeLatest( DELETE_ROLE, deleteRole );
  yield takeLatest( GET_ROLE_BY_ID, getRoleById );

  yield takeLatest(ADD_ROLE_PERMISSION, addRolePermission)
  yield takeLatest(DELETE_ROLE_PERMISSION, deleteRolePermission)
};
