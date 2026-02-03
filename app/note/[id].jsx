import { useNotesStore } from "@/src/store/useNotesStore";
import { colors } from "@/src/theme/tokens";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WARNING_MARKER = "[illegible]";

const markdownStyles = {
  body: { color: colors.text.main },
  heading1: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: colors.text.main,
    marginTop: 0,
    marginBottom: 12,
  },
  heading2: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: colors.text.main,
    marginTop: 20,
    marginBottom: 10,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.main,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 24,
    color: colors.text.main,
    marginTop: 0,
    marginBottom: 12,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    color: colors.text.main,
  },
  strong: { fontWeight: "700" },
  bullet_list_icon: { color: colors.text.main },
  ordered_list_icon: { color: colors.text.main },
  list_item: {
    marginBottom: 4,
    fontSize: 17,
    lineHeight: 24,
  },
  code_inline: {
    fontSize: 14,
    fontFamily: "Menlo",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
};

function createTextRule(showTooltip) {
  return (node, children, parent, styles, inheritedStyles = {}) => {
    const content = node.content ?? "";
    if (!content.includes(WARNING_MARKER)) {
      return (
        <Text key={node.key} style={[inheritedStyles, styles.text]}>
          {content}
        </Text>
      );
    }
    const parts = content.split(WARNING_MARKER);
    return (
      <Text key={node.key} style={[inheritedStyles, styles.text]}>
        {parts[0]}
        <Text
          style={[inheritedStyles, styles.text, warningTextStyle]}
          onPress={() => showTooltip("Low confidence – uncertain read")}
        >
          {WARNING_MARKER}
        </Text>
        {parts[1]}
      </Text>
    );
  };
}

const warningTextStyle = {
  color: colors.warning,
  textDecorationLine: "underline",
  textDecorationColor: colors.warning,
};

export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const note = useNotesStore((s) => s.getNoteById(id));
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const showTooltip = useCallback((message) => {
    setTooltipMessage(message);
    setTooltipVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  const rules = useCallback(
    () => ({
      text: createTextRule(showTooltip),
    }),
    [showTooltip]
  );

  if (!note) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.back}>Back</Text>
          </Pressable>
          <Text style={styles.title}>Note not found</Text>
        </View>
        <Text style={styles.placeholder}>No note with id "{id}".</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Markdown style={markdownStyles} rules={rules()}>
          {note.content}
        </Markdown>
      </ScrollView>

      <Modal visible={tooltipVisible} transparent animationType="fade">
        <Pressable style={styles.tooltipOverlay} onPress={hideTooltip}>
          <View style={[styles.tooltip, { top: "40%" }]}>
            <Text style={styles.tooltipText}>{tooltipMessage}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  back: {
    fontSize: 17,
    color: colors.primary,
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.main,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  placeholder: {
    padding: 24,
    fontSize: 17,
    color: colors.text.sub,
  },
  tooltipOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: colors.text.main,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  tooltipText: {
    fontSize: 15,
    color: colors.surface,
  },
});
