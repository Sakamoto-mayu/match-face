import { SelectReducerAction, UsersReducerAction } from "@/types/admin/tasks/register/types";
import { Users } from "../context/UserSelectContext";

export const UsersReducer = (
  state: Users[],
  action: UsersReducerAction
): Users[] => {
  switch (action.type) {
    case "select": {
      state = action.payload;
    }
    // エラー処理
    default: {
      console.log(`Unknown action type: ${action.type}`);
      return state;
    }
  }
};

export const selecterReducer = (
  state: string[],
  action: SelectReducerAction
): string[] => {
  switch (action.type) {
    case "select": {
      state = action.payload;
    }
    // エラー処理
    default: {
      console.log(`Unknown action type: ${action.type}`);
      return state;
    }
  }
};
