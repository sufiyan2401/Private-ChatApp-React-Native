import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function UnreadMessagesIcon({ count }) {
  return (
    <View>
      <Icon name="email" size={30} style={{ color: '#fff',  }} />
      {count > 0 && (
        <View style={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: 'red',
          borderRadius: 12,
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{count}</Text>
        </View>
      )}
    </View>
  );
}

export default UnreadMessagesIcon;
