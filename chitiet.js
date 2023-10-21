import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
const chitiet = ({ route }) => {
  const { student } = route.params;

  return (
    <View style={styles.chitiet}>
      <Image style={styles.imagechitiet} source={{ uri: student.AnhDaiDien }} />
      <View style={styles.xep}>
      <Text>Tên xe : </Text>
      <Text>{student.Tenxe}</Text>
      </View>
      <View style={styles.xep}>
      <Text>Gia : </Text>
      <Text>{student.Gia}</Text>
      </View>
      <View style={styles.xep}> 
      <Text>tinh trang : </Text>
      <Text>{student.TinhTrang}</Text>
      </View>
      
      {/* Thêm các thông tin khác tại đây */}
    </View>
  );
};

export default chitiet;
