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
        <View style={styles.websiteRow}>
          <View style={styles.websiteIcon}>
            <Text style={styles.websiteIconText}>🌐</Text>
          </View>
          <Text style={styles.website}>{item.website}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>👤 Username</Text>
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(item.username, 'username')}
          >
            <Text style={styles.copyButtonText}>📋</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>🔒 Password</Text>
            <Text style={styles.password}>{'•'.repeat(item.password.length)}</Text>
          </View>
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
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
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
    flex: 1,
    textAlign: 'center',
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  passwordInfo: {
    flex: 1,
    marginRight: 12,
  },
  websiteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  websiteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  websiteIconText: {
    fontSize: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#8e8e93',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  website: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d1d1f',
    letterSpacing: 0.3,
  },
  username: {
    fontSize: 15,
    color: '#3a3a3c',
    fontWeight: '500',
  },
  password: {
    fontSize: 15,
    color: '#8e8e93',
    fontWeight: '500',
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  copyButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff3b30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    fontSize: 18,
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
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
