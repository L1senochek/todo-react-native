import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.view}>
        <Text style={styles.header}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  view: {
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    fontSize: 24,
    color: '#fff',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: '#7000ff',
    paddingHorizontal: 20,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
});
