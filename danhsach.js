
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, Button, Modal, TextInput } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const URL_API = "https://652670ee917d673fd76c44fe.mockapi.io/api/XeHoi";

const danhsach = ({ route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newXe, setNewXe] = useState({ Tenxe: "",  AnhDaiDien: "", Gia: "" ,TinhTrang:""});
  const openModal = () => { setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); };
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const openDeleteConfirmation = () => { setDeleteConfirmationVisible(true); };
  const closeDeleteConfirmation = () => { setDeleteConfirmationVisible(false); };
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingXe, setEditingXe] = useState({  Tenxe: "",  AnhDaiDien: "", Gia: "" ,TinhTrang:""});
  const openEditModal = (xe) => { setEditingXe(xe); setEditModalVisible(true); };
  const closeEditModal = () => { setEditModalVisible(false); };
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const searchStudent = () => {
    setIsSearching(true); // Đang tìm kiếm
    const results = data.filter((item) => item.Tenxe.toLowerCase().includes(searchText.toLowerCase()));
    setSearchResults(results);
  };
 
  
  const editXe = () => {
    if (editingXe.Tenxe === "" || editingXe.AnhDaiDien === "" || editingXe.Gia === "" || editingXe.TinhTrang === "") {
      // Hiển thị thông báo rằng không được để trống
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // const Gia = parseFloat(editingXe.Gia);
    // if (isNaN(Gia) ) {
    //   alert("gias xe phai la so");
    //   return;
    // }

    // const TinhTrang = parseFloat(editingXe.TinhTrang);
    // if (isNaN(TinhTrang) || TinhTrang ==1 || TinhTrang ==-1) {
    //   alert("tinh trang xe phai la 1 hoac -1");
    //   return;
    // }

    fetch(`${URL_API}/${editingXe.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingXe),
    })
      .then(() => {
        getXE(); // Cập nhật danh sách sau khi sửa
        closeEditModal(); // Đóng dialog sửa
      });
  };
  

  const getXE = async () => {
    try {
      const response = await fetch(URL_API);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addXe = () => {
    if (newXe.Tenxe === "" || newXe.AnhDaiDien === "" || newXe.Gia === "" || newXe.TinhTrang === "") {
      // Hiển thị thông báo rằng không được để trống
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // const Gia = parseFloat(editingXe.Gia);
    // if (isNaN(Gia) ) {
    //   alert("gias xe phai la so");
    //   return;
    // }

    // const TinhTrang = parseFloat(editingXe.TinhTrang);
    // if (isNaN(TinhTrang) || TinhTrang ===1 || TinhTrang ===-1) {
    //   alert("tinh trang xe phai la 1 hoac -1");
    //   return;
    // }
  

    fetch(URL_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newXe),
    })
      .then((response) => {
        console.log(response.json());
        getXE();
        closeModal();
      });
  };
  

  // Hàm xóa sinh viên
  const deleteXe = (xeId) => {
    // Thực hiện logic xóa sinh viên
    fetch(`${URL_API}/${xeId}`, {
      method: "DELETE",
    })
      .then(() => {
        getXE(); // Cập nhật danh sách sau khi xóa
      });
  };

  useEffect(() => {
    getXE();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.tong}>
            <TouchableOpacity
              onPress={openModal} 
            >
              <Ionicons name="add" size={35} color="red" />
            </TouchableOpacity>
           

            </View>
              
              <TouchableOpacity onPress={searchStudent}>
              <View style={styles.tong}>
                <TextInput
                  placeholder="Nhập tên Xe"
                  value={searchText}
                  width="90%"
                  onChangeText={(text) => setSearchText(text)}
                />
                 <Ionicons name="search" size={24} color="red" />
                
              </View>
              </TouchableOpacity>
            


            <FlatList
            data={isSearching ? searchResults : data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("chitiet", { student: item })}
                >
                  <View style={styles.itemContainer}>
                    <Image style={styles.image} source={{ uri: item.AnhDaiDien }} />
                    <View style={styles.textContainer}>
                      <Text style={styles.idText}>{item.Tenxe}</Text>
                      <Text style={styles.titleText}>{item.Gia}</Text>
                      <Text style={styles.titleText}>{item.TinhTrang}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => openEditModal(item)}>
                      <Ionicons name="color-wand-outline" size={20} color="black" style={{ marginRight: 15 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openDeleteConfirmation(item.id)} // mở dialog xóa
                    >
                      <Ionicons name="close-circle" size={24} color="red" />
                    </TouchableOpacity>
                   
                    <Modal visible={deleteConfirmationVisible} animationType="slide" transparent>
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 }}>
                          <Text>Bạn có muốn xóa xe này?</Text>
                          <Button title="Xóa" onPress={() => { deleteXe(item.id); closeDeleteConfirmation(); }} />
                          {/* Thêm item.id vào hàm deleteStudent */}
                          <Button title="Hủy" onPress={closeDeleteConfirmation} />
                        </View>
                      </View>
                    </Modal>
                  </View>
                </TouchableOpacity>
              )}
            />
            <Modal visible={isModalVisible} animationType="slide" transparent>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 }}>
                  <Text>Nhập thông tin xe:</Text>
                  <TextInput
                    placeholder="TEN XE"
                    value={newXe.Tenxe}
                    onChangeText={(text) => setNewXe({ ...newXe, Tenxe: text })}
                  />
                  <TextInput
                    placeholder="GIA"
                    value={newXe.Gia}
                    onChangeText={(number) => setNewXe({ ...newXe, Gia: number })}
                  />
                  <TextInput
                    placeholder="Ảnh đại diện"
                    value={newXe.AnhDaiDien}
                    onChangeText={(text) => setNewXe({ ...newXe, AnhDaiDien: text })}
                  />
                  <TextInput
                    placeholder="Tinh trang xe"
                    value={newXe.TinhTrang}
                    onChangeText={(number) => setNewXe({ ...newXe, TinhTrang: number })}
                  />
                  <Button title="Thêm" onPress={addXe} />
                  <Button title="Hủy" onPress={closeModal} />
                </View>
              </View>
            </Modal>
            <Modal visible={editModalVisible} animationType="slide" transparent>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 }}>
                  <Text>Sửa thông tin xe:</Text>
                  <TextInput
                    placeholder="ten xe"
                    value={editingXe.Tenxe}
                    onChangeText={(text) => setEditingXe({ ...editingXe, Tenxe: text })}
                  />
                  <TextInput
                    placeholder="Gia"
                    value={editingXe.Gia}
                    onChangeText={(number) => setEditingXe({ ...editingXe, Gia: number })}
                  />
                  <TextInput
                    placeholder="Ảnh đại diện"
                    value={editingXe.AnhDaiDien}
                    onChangeText={(text) => setEditingXe({ ...editingXe, AnhDaiDien: text })}
                  />
                  <TextInput
                    placeholder="Timnh trang"
                    value={editingXe.TinhTrang}
                    onChangeText={(number) => setEditingXe({ ...editingXe, TinhTrang: number })}
                  />
                  <Button title="Sửa" onPress={editXe} />
                  <Button title="Hủy" onPress={closeEditModal} />
                </View>
              </View>
            </Modal>

          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default danhsach;
