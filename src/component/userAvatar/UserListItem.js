import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../Context/ChatProvider";
import Context from "../../Context/Context";
import { useContext } from "react";

const UserListItem = ({ handleFunction ,User}) => {
  // const { user } = ChatState();
  const func=useContext(Context);
  const user=func.user;

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={User.name}
        src={User.pic}
      />
      <Box>
        <Text>{User.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {User.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
