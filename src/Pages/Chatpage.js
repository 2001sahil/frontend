import { Box } from "@chakra-ui/layout";
import { useState ,useContext} from "react";
import Chatbox from "../component/Chatbox";
import MyChats from "../component/MyChats";
import SideDrawer from "../component/miscellaneous/SideDrawer";
// import  ChatState  from "../Context/ChatProvider";
import Context from "../Context/Context"

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const  func  = useContext(Context)
  const user=func.user;


  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="80%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
