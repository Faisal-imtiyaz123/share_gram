import SearchedMessagingUserList from "./searchedMessagingUserList";

export default function MessagingSideBar() {
  
 
  
  return (
    <div className="w-[18rem] border-r h-screen">
      <div className="flex flex-col p-4 gap-2">
        <h1 className="text-xl bold">Messages</h1>
        {/* <Input
          className="h-[2rem]"
          onChange={async (e) => {
            const regExp = new RegExp(e.target.value,"i")
            setMatchingUsers(e.target.value?
              (followingUsers?.filter((followingUser)=>followingUser.name.match(regExp) || followingUser.username.match(regExp))):
              [])
  
          
          }}
        /> */}
      </div>
      <SearchedMessagingUserList matchingUsers={matchingUsers}/>
    </div>
  );
}
