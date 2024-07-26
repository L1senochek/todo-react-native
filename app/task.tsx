import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router';
import { store } from '@/src/store/store';
import CustomButton from '@/src/components/CustomButton';

const Task: React.FC = (): React.JSX.Element => {
  const { addTask, updateTask } = store((state) => ({
    addTask: state.addTask,
    updateTask: state.updateTask,
  }));

  const router = useRouter();
  const { taskId } = useLocalSearchParams();

  const existingTask = store
    .getState()
    .tasks.find((task) => task.id === Number(taskId));

  const [title, setTitle] = useState<string>(existingTask?.title || '');
  const [description, setDescription] = useState<string>(
    existingTask?.description || ''
  );
  const [error, setError] = useState<string>('');

  const handleSave = (): void => {
    if (title.trim() === '') {
      setError('Please fill in the title');
      return;
    }

    existingTask
      ? updateTask(existingTask.id, { title, description })
      : addTask({ title, description, completed: false });

    setTitle('');
    setDescription('');
    setError('');
    router.push('/');
  };

  useEffect((): void => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    }
  }, [existingTask]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existingTask ? 'Edit Task' : 'Create New Task'}
      </Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (text.trim() !== '') {
            setError('');
          }
        }}
      />
      <Text style={[styles.errorText, error ? styles.errorTextTrue : null]}>
        {error}
      </Text>
      <TextInput
        style={[styles.input, styles.inputDescription]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />
      <CustomButton
        title="Save"
        onPress={handleSave}
        disabled={!!error}
      ></CustomButton>
      <CustomButton
        title="Cancel"
        onPress={() => router.push('/')}
        buttonStyle={{ backgroundColor: '#dfb2ff' }}
        textStyle={{ color: '#7000ff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
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
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 5,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  inputDescription: {
    minHeight: 150,
    verticalAlign: 'top',
    paddingTop: 10,
    marginBottom: 20,
  },
  errorText: {
    opacity: 0,
  },
  errorTextTrue: {
    color: '#ff0000',
    opacity: 1,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
  },
});

export default Task;
