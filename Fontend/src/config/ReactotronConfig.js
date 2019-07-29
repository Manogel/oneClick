import Reactotron from "reactotron-react-native";

if (__DEV__) {
  const tron = Reactotron.configure({ host: "192.168.2.136'" }) //{ host: '192.168.2.134' }
    .useReactNative()
    .connect();
  tron.clear();
  console.tron = tron;
}
