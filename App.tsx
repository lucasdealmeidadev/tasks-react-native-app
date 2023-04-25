import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Task from './src/components/Task';

export type ListProps = {
  key: string;
  item: string;
};

export default function App() {
  const [task, setTask] = useState<string>('');
  const [list, setList] = useState<ListProps[] | []>([]);

  function handleAdd() {
    if (task === '') {
      Alert.alert('Atenção', 'Erro: preencha todos os campos.');
      return;
    }

    const data = {
      key: String(Date.now()),
      item: task
    }

    setList(oldArray => [data, ...oldArray]);
    setTask('');
  }

  function handleDelete(data: ListProps) {
    Alert.alert('Atenção', `Realmente deseja excluir o item: ${data.item}?`, [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Sim, exclua!',
        onPress: function () {
          let filterItem = list.filter((task) => {
            return (task.key !== data.key)
          });

          setList(filterItem);
        }
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder='Digite sua tarefa...'
          style={styles.input}
          value={task}
          onChangeText={(value) => setTask(value)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name='plus' size={20} color='#fff' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Task data={item} deleteItem={() => handleDelete(item)} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input: {
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 44,
    borderRadius: 5,
    paddingHorizontal: 8
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '4%',
    paddingEnd: '4%'
  }
});