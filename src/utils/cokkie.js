const sessionIdToUserMap=new Map();

function setUser(id,user){
   return sessionIdToUserMap.set(id,user)
}
function getUser(id){
    return sessionIdToUserMap.get(id)
}
export {setUser,getUser}