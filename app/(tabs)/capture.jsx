import { ScanOverlay } from "@/components/anim/ScanOverlay";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { useNotesStore } from "@/src/store/useNotesStore";
import { colors } from "@/src/theme/tokens";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_CAMERA_IMAGE = require("@/assets/images/partial-react-logo.png");

export default function CaptureScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addNote = useNotesStore((s) => s.addNote);
  const [scanning, setScanning] = useState(false);
  const [frozen, setFrozen] = useState(false);

  const handleCapture = useCallback(() => {
    setScanning(true);
    setFrozen(true);
  }, []);

  const handleScanComplete = useCallback(() => {
    setScanning(false);
    const note = {
      id: `gen-${Date.now()}`,
      title: `Generated note ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      date: "Just now",
      tag: "From capture",
      content: `# Generated Note

## Overview
- This note was created from the **Capture** flow (mock AI).
- Edit and export from the editor.

## Key Takeaways
- Frontend-only prototype.
- Real generation will use OCR + LLM.`,
      confidenceScore: 0.95,
    };
    addNote(note);
    setFrozen(false);
    router.push(`/note/${note.id}`);
  }, [addNote, router]);

  const tabBarTotalHeight = 68 + 16 + (insets.bottom > 0 ? insets.bottom : 16);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.cameraArea}>
        {frozen ? (
          <Image source={MOCK_CAMERA_IMAGE} style={styles.mockImage} resizeMode="cover" />
        ) : (
          <View style={styles.mockCamera}>
            <Text style={styles.mockLabel}>Board / slide</Text>
            <Text style={styles.mockHint}>Tap the button to scan</Text>
          </View>
        )}
        <ScanOverlay visible={scanning} duration={2000} onComplete={handleScanComplete} />
      </View>
      <View style={[styles.controls, { marginBottom: tabBarTotalHeight }]}>
        <LiquidButton onPress={handleCapture} disabled={scanning} isActive={!scanning} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cameraArea: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  mockCamera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mockLabel: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.text.sub,
    marginBottom: 8,
  },
  mockHint: {
    fontSize: 17,
    color: colors.text.sub,
    opacity: 0.8,
  },
  mockImage: {
    width: "100%",
    height: "100%",
  },
  controls: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
});
