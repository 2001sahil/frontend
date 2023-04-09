import { Box } from "@chakra-ui/layout";
import "./styles.css";
import { useContext } from "react";
import SingleChat from "./SingleChat";
// import { ChatState } from "../Context/ChatProvider";
import Context from "../Context/Context";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  // const { selectedChat } = ChatState();
  const func=useContext(Context);
  const selectedChat=func.selectedChat;

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
