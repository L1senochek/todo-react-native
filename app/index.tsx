import CustomButton from '@/src/components/CustomButton';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import ITask from '@/src/model/Task';
import { store } from '@/src/store/store';
import { Link, router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const { tasks, toggleTaskStatus, deleteTask } = store((state) => ({
    tasks: state.tasks,
    toggleTaskStatus: state.toggleTaskStatus,
    deleteTask: state.deleteTask,
  }));

  const renderItem = ({ item }: { item: ITask }): React.JSX.Element => (
    <View
      style={[
        styles.taskContainer,
        item.completed && styles.completedTaskContainer,
      ]}
    >
      <Text
        style={{
          textDecorationLine: item.completed ? 'line-through' : 'none',
          color: '#fff',
        }}
      >
        {item.title}
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={item.completed ? 'Uncomplete' : 'Complete'}
          onPress={(): void => toggleTaskStatus(item.id)}
        />
        <CustomButton
          title="Edit"
          onPress={(): void => router.push(`/task?taskId=${item.id}`)}
        />
        <CustomButton
          title="Delete"
          onPress={(): void => deleteTask(item.id)}
        />
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>
        <Link href="/task" style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Task</Text>
        </Link>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item: ITask): string => item.id.toString()}
          style={styles.flatList}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0e0023',
    color: '#fff',
    gap: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 400,
    color: '#fff',
  },
  taskContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 30,
    borderColor: '#9600ff5c',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#28005bd4',
    marginBottom: 20,
  },
  completedTaskContainer: {
    backgroundColor: '#20003e59',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7000ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flatList: {
    gap: 20,
    color: '#fff',
  },
});
