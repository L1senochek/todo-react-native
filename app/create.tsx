import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { store } from '@/src/store/store';
import CustomButton from '@/src/components/CustomButton';

export default function Create() {
  const { addTask } = store((state) => ({ addTask: state.addTask }));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title) {
      addTask({ title, description, completed: false });
      router.push(`/`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New ToDo</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.inputDescription]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />
      <CustomButton title="Save" onPress={handleSave}></CustomButton>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Cancel</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 5,
  },
  inputDescription: {
    minHeight: 150,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
  },
});
