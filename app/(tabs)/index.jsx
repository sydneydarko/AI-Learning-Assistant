import { useNotesStore } from "@/src/store/useNotesStore";
import { colors, spacing } from "@/src/theme/tokens";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function cleanPreviewText(content) {
  return content
    .replace(/#{1,6}\s/g, "") // Remove heading markers
    .replace(/\*\*/g, "") // Remove bold markers
    .replace(/\*/g, "") // Remove italic markers
    .replace(/\[illegible\]/g, "") // Remove warning markers
    .replace(/`/g, "") // Remove code markers
    .replace(/^[-*]\s/gm, "") // Remove list markers
    .replace(/^\d+\.\s/gm, "") // Remove numbered list markers
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse multiple spaces
    .trim();
}

function NoteCard({ note, onPress }) {
  const preview = cleanPreviewText(note.content).slice(0, 120);
  const displayPreview = preview.length < note.content.length ? preview + "…" : preview;

  return (
    <Pressable
      onPress={() => onPress(note.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardPreview}>
        <Text style={styles.previewText} numberOfLines={4}>
          {displayPreview}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {note.title}
        </Text>
        <View style={styles.meta}>
          <View style={styles.pill}>
            <Text style={styles.pillText} numberOfLines={1}>
              {note.tag}
            </Text>
          </View>
          <Text style={styles.date}>{note.date}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const notes = useNotesStore((state) => state.notes);

  const handlePressNote = useCallback(
    (id) => {
      router.push(`/note/${id}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }) => <NoteCard note={item} onPress={handlePressNote} />,
    [handlePressNote]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const tabBarTotalHeight =
    spacing.tabBarHeight +
    spacing.tabBarBottom +
    (insets.bottom > 0 ? insets.bottom : spacing.tabBarBottom);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        key="two-column"
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBarTotalHeight + 16 },
        ]}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.6,
    color: colors.text.main,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },
  card: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardPreview: {
    height: 110,
    padding: 14,
    paddingTop: 16,
    justifyContent: "flex-start",
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  previewText: {
    fontSize: 13,
    color: colors.text.sub,
    lineHeight: 19,
  },
  cardFooter: {
    padding: 14,
    paddingTop: 12,
    backgroundColor: colors.surface,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text.main,
    marginBottom: 8,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  pill: {
    backgroundColor: colors.primary + "1A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    maxWidth: "60%",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  date: {
    fontSize: 12,
    color: colors.text.sub,
    fontWeight: "500",
  },
});
