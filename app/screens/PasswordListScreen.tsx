import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Clipboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllPasswords, deletePasswordEntry, PasswordEntry } from '../../utils/storage';

export default function PasswordListScreen() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      loadPasswords();
    }, [])
  );

  const loadPasswords = async () => {
    const savedPasswords = await getAllPasswords();
    setPasswords(savedPasswords);
  };

  const handleDelete = (id: string, website: string) => {
    Alert.alert(
      'Delete Password',
      `Are you sure you want to delete the password for ${website}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deletePassword(id) }
      ]
    );
  };

  const deletePassword = async (id: string) => {
    await deletePasswordEntry(id);
    loadPasswords();
  };

  const copyToClipboard = (text: string, type: 'username' | 'password') => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `${type === 'username' ? 'Username' : 'Password'} copied to clipboard`);
  };

  const renderPasswordItem = ({ item }: { item: PasswordEntry }) => (
    <View style={styles.passwordItem}>
      <View style={styles.passwordInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.website}>{item.website}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.username}>{item.username}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(item.username, 'username')}
          >
            <Text style={styles.copyButtonText}>📋</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.password}>{'•'.repeat(item.password.length)}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(item.password, 'password')}
          >
            <Text style={styles.copyButtonText}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.website)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Saved Passwords</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPassword')}
        >
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {passwords.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No passwords saved yet</Text>
        </View>
      ) : (
        <FlatList
          data={passwords}
          renderItem={renderPasswordItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#4a90e2',
    fontWeight: '600',
  },
  list: {
    padding: 20,
  },
  passwordItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  website: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  password: {
    fontSize: 14,
    color: '#999',
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  copyButtonText: {
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '600',
  },
});
