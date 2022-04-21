import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { icon } from "../constants/icon";

export default function SetRepo({ route, navigation }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [repo, setRepo] = useState(data.repo);

  //change header back button icon
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 10 }}>
          <Image source={icon.arrow} resizeMode='contain' style={{ width: 20 }} />
        </TouchableOpacity>
      ),
    });
  });

  // button done handler
  const onButtonDone = () => {
    dispatch({
      type: "SET_REPO",
      repo: repo,
    });
    navigation.goBack();
  };

  return (
    <View style={style.main}>
      <TextInput placeholder='type yopur github repo' value={repo} style={style.input} onChangeText={setRepo} />
      <View style={style.bottom}>
        <TouchableOpacity onPress={onButtonDone}>
          <Text style={style.buttonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = {
  main: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  bottom: { justifyContent: "flex-end", flexDirection: "row" },
  buttonText: { fontWeight: "bold", fontSize: 20 },
  input: { width: "100%", fontSize: 20, color: "gray", borderBottomWidth: 2, borderColor: "black" },
};
