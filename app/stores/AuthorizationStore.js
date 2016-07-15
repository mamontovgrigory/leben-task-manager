import React from "react";
import _ from "lodash";

class AuthorizationStore extends React.Component{
    login(data){ //TODO: Temporary
        let users = [
            {
                login: "1",
                password: "1"
            },
            {
                login: "user",
                password: "querty"
            },
            {
                login: "sweto4ka",
                password: "21022015"
            }
        ];
        let userIndex = _.findIndex(users, function(u) { return u.login == data.login; });
        let response = users[userIndex] && users[userIndex].password === data.password ? users[userIndex]: null;
        let success = response ? true : false;
        if(data.callback && typeof(data.callback) === "function"){
            data.callback(response, success);
        }
    }
}

const authorizationStore = new AuthorizationStore;
export default authorizationStore;