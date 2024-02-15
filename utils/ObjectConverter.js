/**
 * Need a fucntion which takes an array of user objects
 * remove the sensetive information ( like password ) and then return 
 * response 
 */


exports.userResponse = (users) =>{

    const userResult =[];

    users.forEach(user =>{
        userResult.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userTypes : user.userTypes,
            userStatus : user.userStatus

        });
    });

    return userResult ;
}