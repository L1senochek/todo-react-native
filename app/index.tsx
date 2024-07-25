import ITask from '@/src/model/Task';
import { store } from '@/src/store/store';
import { Link } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const { tasks, toggleTaskStatus, deleteTask } = store((state) => ({
    tasks: state.tasks,
    toggleTaskStatus: state.toggleTaskStatus,
    deleteTask: state.deleteTask,
  }));

  const renderItem = ({ item }: { item: ITask }) => (
    <View style={styles.taskContainer}>
      <Text
        style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}
      >
        {item.title}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={item.completed ? 'Undo' : 'Complete'}
          onPress={() => toggleTaskStatus(item.id)}
        />
        <Button title="Edit" />
        <Button title="Delete" onPress={() => deleteTask(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <Link href="/create" style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Task</Text>
      </Link>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7000ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    maxWidth: 200,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
