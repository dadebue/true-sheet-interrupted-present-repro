import { useRef } from "react";
import { Button, Text, View } from "react-native";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

// Present the next sheet and dismiss the other one in the same tick.
const show = (next: "A" | "B") => {
  TrueSheet.present(next);
  TrueSheet.dismiss(next === "A" ? "B" : "A");
};

export default function App() {
  const breakB = useRef(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", gap: 12, padding: 24 }}>
      <Button title="Present A" onPress={() => TrueSheet.present("A")} />
      <Button title="Switch to B" onPress={() => show("B")} />
      <Button
        title="Break B"
        onPress={() => {
          breakB.current = true;
          show("B");
        }}
      />

      <TrueSheet name="A" detents={[0.3]} dimmed={false}>
        <Text style={{ padding: 24 }}>Sheet A</Text>
      </TrueSheet>
      <TrueSheet
        name="B"
        detents={[0.3]}
        dimmed={false}
        onWillPresent={() => {
          // Dismiss B while its present animation is running.
          if (breakB.current) {
            breakB.current = false;
            show("A");
          }
        }}
      >
        <Text style={{ padding: 24 }}>Sheet B</Text>
      </TrueSheet>
    </View>
  );
}
