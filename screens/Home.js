import { Text, View, StatusBar, TextInput, Touchable, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";

// ENPOINT
const TEST_ENDPOINT = "https://pushmore.io/webhook/UfV1JqA8d7tYJCibkDhD4Zwq";
const SIMONE_ENDPOINT = "https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41";
const GIT_HUB_API = "https://api.github.com/repos";
const GIT_HUB_URL = "https://github.com";

// CHECK RESULT
const ERROR = 1;
const OK = 2;

//PHASE
const SETUP = 1;
const CHECK = 2;
const SEND = 3;
const SUCCESS = 4;

//ERROR TYPE
const INTERNET_ERROR = 0;
const REPOSITORY_NOT_FOUND = 1;

// select a background based on actual status
const backgroundSelector = (value) => {
  let color = "";
  switch (value) {
    case ERROR:
      color = "#CC8A8A";
      break;
    case OK:
      color = "#CAFFDA";
      break;
    default:
      color = "white";
  }
  return color;
};

export default function Home({ route, navigation }) {
  //store
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  //net info
  const netInfo = useNetInfo();

  // page state
  const [message, setMessage] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [errorType, setErrorType] = useState("");
  const [phase, setPhase] = useState(SETUP);

  // set user button handler
  const onButtonSetUser = () => {
    navigation.push("USER");
  };

  // set repobutton handler
  const onButtonSetRepo = () => {
    navigation.push("REPOSITORY");
  };

  // check button handler
  const onButtonCheck = async () => {
    setPhase(CHECK);
    if (netInfo.isConnected) {
      try {
        const url = `${GIT_HUB_API}/${data.user}/${data.repo}`;
        const response = await fetch(url);
        const json = await response.json();
        if (json.message == "Not Found") {
          setCheckResult(ERROR);
          setErrorType(REPOSITORY_NOT_FOUND);
        } else {
          setCheckResult(OK);
          setPhase(SEND);
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    } else {
      setErrorType(INTERNET_ERROR);
      setCheckResult(ERROR);
    }
  };

  // send button handler
  const onButtonSend = async () => {
    try {
      const request = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: `${GIT_HUB_URL}/${data.user}/${data.repo}`,
          sender: data.user,
        }),
      };
      const response = await fetch(SIMONE_ENDPOINT, request);

      if (response.status == 200) {
        setPhase(SUCCESS);
        setCheckResult(null);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // cool button handler
  const onButtonReset = () => {
    setPhase(SETUP);
    setCheckResult(null);
    setErrorType(null);
  };

  const errorConnectionMessage = (
    <Text style={{ fontSize: 20 }}>
      Check your <Text style={{ fontWeight: "bold" }}>Internt connection</Text>
    </Text>
  );

  const repoNotFoundMessage = (
    <Text style={{ fontSize: 20 }}>
      Check your <Text style={{ fontWeight: "bold" }}>Username </Text> or your{" "}
      <Text style={{ fontWeight: "bold" }}>Repository </Text> name
    </Text>
  );

  return (
    <View style={[style.main, { backgroundColor: backgroundSelector(checkResult) }]}>
      <StatusBar backgroundColor={backgroundSelector(checkResult)} barStyle='dark-content'></StatusBar>

      {/* TOP SECTION  */}
      <View>
        {phase != SUCCESS && (
          <>
            <Text style={style.title}>Set the repository addres</Text>
            <Text style={style.mainText}>github.com</Text>
            <View style={style.inputRow}>
              <Text style={style.mainText}>/</Text>
              <TouchableOpacity placeholder='user' style={style.input} onPress={onButtonSetUser}>
                <Text style={style.secondText}>{data.user}</Text>
              </TouchableOpacity>
            </View>
            <View style={style.inputRow}>
              <Text style={style.mainText}>/</Text>
              <TouchableOpacity placeholder='repo' style={style.input} onPress={onButtonSetRepo}>
                <Text style={style.secondText}>{data.repo}</Text>
              </TouchableOpacity>
            </View>

            {phase === CHECK && checkResult !== OK && errorType === REPOSITORY_NOT_FOUND && repoNotFoundMessage}
            {phase === CHECK && checkResult !== OK && errorType === INTERNET_ERROR && errorConnectionMessage}
          </>
        )}
        {phase === SUCCESS && <Text style={style.successText}>All done ! Repository sent</Text>}
      </View>

      {/* BOTTOM  SECTION  */}
      <View style={style.bottom}>
        {(phase === CHECK || phase === SETUP) && (
          <TouchableOpacity onPress={onButtonCheck}>
            <Text style={style.buttonText}>CHECK</Text>
          </TouchableOpacity>
        )}

        {checkResult === OK && phase === SEND && (
          <TouchableOpacity onPress={onButtonSend}>
            <Text style={style.buttonText}>SEND</Text>
          </TouchableOpacity>
        )}
        {phase === SUCCESS && (
          <TouchableOpacity onPress={onButtonReset}>
            <Text style={style.buttonText}>COOL</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const style = {
  main: { flex: 1, padding: 20, backgroundColor: "white", justifyContent: "space-between" },
  title: { fontSize: 16, color: "black", fontWeight: "bold" },
  mainText: { fontSize: 50, color: "black" },
  secondText: { fontSize: 50, color: "gray" },
  inputRow: { flexDirection: "row" },
  message: { fontSize: 16 },
  input: { flex: 1, color: "gray", fontSize: 50 },
  bottom: { justifyContent: "flex-end", flexDirection: "row" },
  buttonText: { fontWeight: "bold", fontSize: 20 },
  successText: { fontSize: 40, color: "black", fontWeight: "bold", textAlign: "center" },
};
